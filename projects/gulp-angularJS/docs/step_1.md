# Step 1: Up and Running

## Installing

We are going to build off of what we learned in the `gulp-yarn` project.  Lets init the new project, then
install angular & browserSync to do our file serving:

```bash
yarn init                   # answer the Qs to gen a package.json
# add our dev dependencies
yarn add gulp -dev
yarn add browser-sync -dev
# add our app dependencies
yarn add angular
yarn add todomvc-app-css    # because we are going to build a simple todo app
```

After this, we should lay out our project structure:

```bash
mkdir src dist test mocks
cd src
mkdir components
touch index.html
touch app.js
```

We are going to go with a component based structure, which
means we will co-locate html, css & js for each component
in one directory.

Then, lets drop some dummy html in our index:

```html
<html>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```
Then we can setup our gulpfile.js to serve this up using
BrowserSync:

```JavaScript
'use strict'

const gulp = require('gulp');

// a quick dummy task
gulp.task('hello', [], () => {
  console.log('Hello world.');
});

```

Ok, gulp is working, lets add browserSync:

```JavaScript
const browserSync = require('browser-sync').create();

// we may want to serve source or dist, so lets name it
// appropriately
gulp.task('serve:src', () => {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});
```

Now, we definitely want a `default` gulp task, and we may want a
plain `serve` task, since that is the convention most people are
familiar with.  So we can create it as an alias, that way we can
always point it at another task (say if later we want to serve the
built code by default):

```JavaScript
// we can just alias serve for now
gulp.task('serve', ['srve:src']);


// always good to have a default
gulp.task('default', ['serve']);
```

Now, let setup some automation to include our source files in our
`index.html` automatically.  This is a pain to manually maintain,
and there are plenty of options to make this easier.  Lets use
`gulp-inject`:

```bash
yarn add gulp-inject -dev
```

`gulp-inject` can handle all of our CSS & JS.  However, we need to
be smart and tell it about:

- Our installed dependencies (angular, for example)
  - we need to tell it about these file by file because
    we can't just include all of our node_modules!  That would
    load up our dev dependencies in the browser & make a big mess
    (we do not expect these to grow the same way our app code will grow).
- Our own application code
  - We can be generic here, as we will want it to just bundle up
    all of our application code (we expect this to grow indefinitely).

But, lets star with something simple and update our HTML file with an
inject block.  See the [gulp-inject](https://www.npmjs.com/package/gulp-inject)
package for how this works.  Essentially, we drop in a couple comment blocks
that the module will look for and will replace with script and css tags:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hello World</title>
     <!-- inject:css -->
     <!-- endinject -->
  </head>
  <body>
    <h1>Hello World</h1>

    <!-- inject:js -->
    <!-- endinject -->
  </body>
</html>
```

Ok, so we have the blocks.  No change yet.  Now, lets add some dummy
css and JS to our project and see if we can get it injected.

```bash
mkdir src/components/hello-world
touch src/components/hello-world/hello.css
touch src/components/hello-world/hello.js
touch src/components/hello-world/hello.html
```

Now, fill these in with a little bit of content so that we can be certain
our loading works.  A `console.log('Hello World')` and a `.hello {  }` with
some styles should be sufficient.  

Ok, now its time to do some injecting!  

What could go wrong?  Well, anytime you process source, you need to dump the
output somewhere.  This is typically to a `/dist` or a `/tmp` location.  If
we are dumping out a result, we need to view that result, right?  If we need
to view the result instead of the source, will our current `serve` task continue
to be useful?  Not so much.  Also, when we make changes to the files, we will
have to manually re-run these commands.  All of this is possible to solve, but
we will do it step-by-step.

Ok, so onward to our `gulpfile.js`!

```JavaScript
const inject = require('gulp-inject');

gulp.task('index', function() {
  let target = gulp.src('./src/index.html');
  // lets start with an array of one glob, that way its
  // easy to add more later
  let sources = gulp.src(
    // glob to recursively look through all components folder for JS
    [ './src/components/**/*.js' ],
    // this is nifty. gulp doesn't actually have to read the contents
    // of any of these files.  we only care about their locations!
    { read: false }
  );
  return target
          .pipe(inject(sources))
          // hmm, its a bit scary to write over top of our source
          // file, but it appears that this is what is expected
          // for this plugin.  ok then!
          .pipe(gulp.dest('./src'));

});
```

Well, give it a run and lets see what happens!

Ok, if all is well, lets get our `css` files in there too. We can update
this task by just adding a glob to pick up the css files, which is
going to be just about the same pattern matcher:

```JavaScript

gulp.task('index', function() {
  let target = gulp.src('./src/index.html');
  let sources = gulp.src(
    [
      './src/components/**/*.js',
      // add our css glob here:
      './src/components/**/*.css'
    ],
    { read: false }
  );
  return target
          .pipe(inject(sources))
          .pipe(gulp.dest('./src'));

});

```

And run it again.  You should now have a source index file that has all
of your css & js in it.  Nice.  So far, our `gulp serve` task should even
continue to work!

Give it a shot & open up your browser.  You may want to drop
`<div class="hello">Hello?</div>` into your index.html to ensure the css works.

So serve it up:

```bash
gulp serve
```
Should load up our file with the appropriate dependencies injected to the html,
however, I did not see the style applied to my `Hello World` div.  Inspection from the
dev console revealed `404`s.  What's wrong?

The problem is that our links look like this:

```html
  <link rel="stylesheet" href="/src/components/hello-world/hello.css">
  <script src="/src/components/hello-world/hello.js"></script>
```
See that leading `/src`?  Our `gulp.serve` task serves files FROM `/src`, and
there is not another `/src` inside our `/src`.  So we need to resolve this.  

It looks like `gulp-inject` has an option that changes the resolution of the
paths from the source file's common working directory (cwd) to that of the
target file's directory (our target is our `index.html`).

This means adding an options object to our `index` task:

```JavaScript
  gulp.task('index', () => {
    gulp  
      .src(['files'])
      .pipe(inject(
        ['files'],
        {read: false},
        // add this and it should remove the leading /src
        {relative: true}
      ))
  })
```

Ok, that should have worked, but it didn't.  What went wrong?

Assignment:

1. Work out why this isn't working as expected.
1. Once you get that working, lets add eslint or jshint to the project.


Next week:

- we will vendor in angular & other dependencies, such as angular
- we will ensure vendored dependencies load first
- we will build our /dist
- we will setup our server so that we can view either the
  source or the dist in the browser
- we will copy this project as a template for future projects so we
  don't have to setup the basics each time
- we will write a little bit of angular to get the todo app running
