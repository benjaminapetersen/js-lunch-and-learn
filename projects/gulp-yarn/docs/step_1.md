# Step 1: Installing the tools & adding a CSS task

## Why yarn and gulp?

Not that we necessarily want another build tool, we've been using `npm` and `bower` for a good while, but there
are some significant improvements that come with `yarn` to eliminate common pain points & the bandaids associated
with them.  In addition, there is really very little reason to maintain two different versions of packages for
your front end app & your build tools.

`gulp` is chosen because working with it is as close to writing plain ol' JS as you can get (as far as I have experienced).
`grunt` and other tools require complex configuration that is daunting & frankly harder to pick up.  Most of the time
people opt in to a pre-built setup & later experience a lot of pain attempting to tweak it to suite a projects needs.


## Follow-along

The following commands will get you up to speed on what was done to achieve this setup.  We will add some of the basic tasks like `gulp serve` as well as do some
more interesting things.  A few handy resources if you want some further reading:

- [Gulp for beginners](https://css-tricks.com/gulp-for-beginners/)
- [Gulp best practices](http://blog.rangle.io/angular-gulp-bestpractices/)
- [Gulp recipes](https://github.com/gulpjs/gulp/tree/master/docs/recipes)

Install

```bash
# ensure yarn is installed on your system
# i recommend homebrew for just about everything
# `brew install <package>`
# even for installing things like browers!  There is
# a special command to use homebrew to install your
# regular apps called `cask`.  The beauty of doing this
# is that you can easily setup & migrate to new machines
# if you use `brew cask install <package>` such as
# `brew cask install google-chrome`
# homebrew: https://brew.sh/
# homebrew cask: https://caskroom.github.io/
brew install yarn
```

Initialize your project.  This will setup a `package.json` file in your root directory.

```bash
# create project directory
# mkdir <name-of-my-project>
mkdir gulp-yarn
cd ./gulp-yarn
# yarn init will ask you a bunch of questions.
# you should be able to accept most of the defaults.
# i tend to set the version # to 0.0.1 rather than
# 1.0.0 as 1.0.0 tends to signify "first release of completed product".
yarn init
```

The other basic commands you will need to know:

```bash
# add a new dependency
# optionally add @tag or @version if you want to specify
yarn add <package>
yarn add <package>@<tag>
# add a dev dependency. these are your build tools, things not
# part of your final product.
yarn add <package> --dev
# remove a package
yarn remove <package>
# install everything in a package.json file
yarn install
```

Adding `gulp` as our build tool

```bash
# you only need the gulp cli installed once globally as you  
# can use it for many projects
yarn global add gulp-cli
# now add gulp specifically to this project
yarn add gulp --dev
# we will put our gulp instructions in a gulpfile
touch gulpfile.js
# you can ask gulp for help
# this is a little bit of a trick
# its not going to tell you what gulp can do,
# its going to tell you what tasks are in your gulpfile
# this is really handy for new users in your project
# but right now, we have no tasks cuz our gulpfile is empty :)
gulp --help
```

Now we need a basic project structure

```bash
# lets put our source in ./src
mkdir ./src
# and we want a dist
mkdir ./dist
# we might even write tests
mkdir ./test
# and we will want some subdirectories in our ./src
cd ./src
mkdir scripts styles mocks images fonts
# and lets add an index.html
touch index.html
```

We also probably want some helper files

```bash
# its good to tell git not to commit everything
# if you are on mac, the first thing you should add
# to this file is that pesky .DS_Store
touch .gitignore
# i bet we will setup ESLint to help us write good JS
touch .eslint.json
# so lets add eslint so we can be sure to use it
# look in your package.json file after this to ensure it
# gets installed properly.
yarn add eslint --dev
```

Ok, lets add an `index.html` file and make sure we can serve it.
We will start with just the `./src`, but eventully will want to  
also serve the `./dist` and our built project.

```bash
cd src
vim index.html
```

It doesn't matter much what you put in this file yet, but add something
like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello World</title>
  </head>
  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

Ok, time to do some gulp!  We need to setup our gulp file:

```JavaScript
// gulpfile.js
const gulp = require('gulp');

// make a dummy task:
gulp.task('hello-world', () => {
  console.log('Hello World!  Wheee......');
});
```

Now that we have a task, lets run it from the command line:

```bash
gulp my-task
```

Well, that was fun. But how about something that acutally does work...Gulp
is a task runner / build tool.  Therefore it will typically be used to  
grab some files & do some work with those files, probably generating new files.
Therefore a task will actually look more like this:

```JavaScript
gulp.task('my-task', () => {
  // you want to be able to run a series of tasks, so
  // be sure to return!
  return gulp
          // pick up some files
          .src('./some/input/files')
          // run a plugin on those files
          .pipe(somePlugin())
          // output the new files somewhere else
          .pipe(
            gulp.dest('./some/output/location')
          );
});
```

Ok, well, lets see this input/output in action.  We can start with some
css processing, which is a fairly familar concept to everyone.

```bash
yarn add gulp-sass
```

Now lets update our gulpfile.js:

```JavaScript
const sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp
          // globbing!
          .src('./src/styles/**/*.scss')
          .pipe(sass())
          .pipe(
            gulp.dest('./dist/styles')
          );
});
```

Quick tangent, if not familiar with globbing, its the way to pattern match
and grab bunches of files.  We will usually use the same globbing pattern
thoughout our file, but its good to know of a couple:

```JavaScript
gulp.src('*.scss');          // all of a particular kind of file in a dir
gulp.src('**/*.scss');       // recursively just keep matching, the most useful
gulp.src('!not-this.scss');  // ! = not this one
gulp.src('*.+(scss|sass)');  // *. = all, + says "with the following" this || that extension
```


Ok, well, lets write some sass in `./styles` and see what happens!  One thing
to consider... does this work on one file or many?

If it worked, it should turn your sass into css & put it in `./dist/styles`.

If you change your files a few times, you might notice that old "cruft" will
linger.  This is bad. We want every build to be fresh & new.  Therefore, we need
to clean up the dist before we rebuild our sass.  Lets add a task, and then
chain the tasks together.

```bash
yarn add del
```

Then add a task:

```JavaScript
const del = require('del');

gulp.task('clean-dist', () => {
  // lets do an array this time
  return del([
    'dist/styles',
    'dist/scripts'
  ]);
});
```

Now, lets tell gulp to clean before we run sass:

```JavaScript

// so a gulp task goes like this:
// gulp.task('task-name', [list-of-tasks-to-run-first], function)
gulp.task('sass', ['clean-dist'], () => {
  return gulp
          .src('./src/styles/**/*.scss')
          .pipe(sass())
          .pipe(
            gulp.dest('./dist/styles')
          );
});

```


Homework

1. Add multiple SASS files & see if they properly compile
1. Try adding autoprefixer to your sass task
1. See if you can concatenate your output css into a single file!
1. Give this tutorial a shot [Process & merge both SASS & LESS](https://ypereirareis.github.io/blog/2015/10/22/gulp-merge-less-sass-css/)
