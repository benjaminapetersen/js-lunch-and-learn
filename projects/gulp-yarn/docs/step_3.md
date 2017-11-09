# Step 3: Babel

[Babel](https://babeljs.io/) is a JavaScript compiler. Its purpose is
to transform one version of JavaScript into another.  

Fortunately, it has a [setup guide](https://babeljs.io/docs/setup) for
whatever kind of system you may be using. We will keep working with our
gulp project, so will choose the [gulp path](https://babeljs.io/docs/setup#installation).

The instructions are pretty straight forward:


```bash
# gotta install.
# in this case, they do recommend the gulp-babel wrapper.
# this is probably handling the stream conversion (and perhaps
# a few other things) like we talked about last week.
yarn add gulp-babel -dev
```

The initial setup in our `gulpfile.js` is dead simple:

```JavaScript
let gulp = require('gulp'),
    babel = require('gulp-babel');


gulp.task('transpilejs', () => {
  return gulp
          .src('src/sripts/main.js')
          .pipe(babel())
          // lets dump it in a special dir for now,
          // just to be sure we know whats getting made.
          .pipe(gulp.dest('dist/babel'));
});

```

Welp, time to give it a run and see!

Run

```bash
gulp transpilejs
```

This should work, but it will do nothing.  To get `babel` to do actual
work, we need plugins and a `.babelrc` file (just like a .jshintrc).


```bash
# in the root of the app
# we will edit it in a minute
touch .babelrc
```

Then lets install the babel `env` plugin.  This plugin is what is
responsible for turning JavaScript into `ES2015+`, which is what
most browsers can run reliably.

```bash
yarn add babel-preset-env -dev
```

Now, we can update the `.babelrc` file & use the `env` plugin:

```JavaScript
// in .babelrc
{
  "presets": [
    "env"
  ]
}

```

Now lets update our `transpilejs` task:

```JavaScript

// TODO:

```

<!--
TODO:

Now, might as well add sourcemaps so we can more easily debug our
transpiled JavaScript.  
-->
