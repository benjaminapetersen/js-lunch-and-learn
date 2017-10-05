# Step 2: Processing some JS

Last week's homework was to add some additional `.sass` files, including some `_includes.sass` and
ensure they are properly compiled.  In addition, add `autoprefixer`.  We are not going to go over
these today, so if you didn't do them, time to head back!


## Processing Our JavaScript

There are a number of ways that modern projects are built.  The older methods make no use of
`import` statements, instead relying on the developer (or a few tools) to manually add all
the required files to an `index.html` file.  The build tools typically scan `index.html` and
compile all of these source files into a few dist files.  This is not idea for a number of
reasons.  First, it is a pain for developers to maintain.  Second, it is hard to be certain
that each required file is actually being used, thus projects accumulate cruft over time.

There is a better way, via `includes` or `imports`.  If a module requires another module,
this should be noted in the module.  Tools then just follow the tree of requirements
and finally include all of these files in the dist.  This means that once a module is no
longer required by another module, it will not be shipped.  This keeps our final code in
better condition.

## Browserify

Browserify is one of a number of tools that will trace imports.  An alternative called `webpack` is
a bit more popular in the current environment, but is also know to be quite difficult to configure.
An older tool called `require.js` does similar things.  Since we prefer to understand what our tools
do, we will be using browserify in this tutorial.

Installation is easy, we drop it in just like all of our other dev packages:

```bash
yarn add browserify -dev
# NOTE: we could use gulp-browserify, which makes things a bit slick,
# this is similar to how grunt has tons of wrappers to glue things together.
# the problem is, they get out of date (this one is deprecated).  All we need
# is something to ensure the output of any node module is ready to get
# sent into gulp's .pipe() function to string it into whatever else we
# want to do.  To make that possible, we will use:
yarn add vinyl-source-stream -dev
# vinyl-source-stream takes text inputs and returns a stream.
```

Remind me about streams?  Follow the analogy of a stream or river.  Data
is available even when it is not fully loaded, and can flow into the next
pipe.  Practically, each `.pipe()` will fully process before it passes
data along to the next function in a pipe, however, it does not have to
write the output to a `tmp` file in between.  This is why we can easily
chain a bunch of tasks together, such as processing sass, autoprefixing,
concatenating, and minifying, all in one gulp function.

Want some more info?  Here is a [good read](https://florian.ec/articles/gulp-js-streams/).

Now we will need to create a few JS files:

```JavaScript
// main.js
'use strict';

let add = require('./add.js');
console.log('main.js', add(2,3)); // main.js 5
```
Now, we can test this quick using browserify directly:

```bash
# one thing to note:
# to use browserify globally you must do:
yarn global add browserify
# otherwise, you will have to invoke browserify
# from within  ./node_modules/browserify/
browserify src/scripts/main.js > dist/bundle.js
```

If all is well, you should be able to open `dist/bundle.js` and
see your compiled JS. The next step is to use gulp to run browserify, because we want to be able setup a chain of tools.  Perhaps we will
also minify our JavaScript files.

Lets add browserify to our `gulpfile.js`:

```JavaScript
// no gulp-browserify shim needed!
// this is another advantage over grunt, which has
// lots of shim libraries
let browserify = require('browserify');
```

And add a script task, that will do what we just did manually:

```JavaScript
gulp.task('scripts', ['clean-dist'], () => {
  // this is a little different of a chain as it doesn't start
  // with gulp.src().  There is a `gulp-browserify` plugin you
  // can use if you want to keep that uniformity
  return browserify({
            // only the entry points
            entries: 'src/scripts/main.js'
          })
          // make a bundled output
          .bundle()
          .pipe(
            gulp.dest('./dist')
          );
});
```

Lets make sure it picks up globals like `lodash` or `jquery`:

```bash
yarn add lodash # no -dev flag, this is app code!
```

And lets add some lodash to our `main.js`:

```JavaScript
'use strict';

let add = require('./add.js'),
    _ = require('lodash');

console.log('main.js', add(2,3)); // main.js 5
console.log(_.map([1,2,3], function(num, index, list) {
  // get the next item, but if at the end, go back to beginning
  let next = list[index + 1] || list[0];
  // just make a map of added numbers
  return num + next;
}));

```

Now run:

```bash
gulp scripts
```

And if everything worked as intended, your `dist/main.js` should
be a LOT larger, since it now includes `lodash` which it found in
`node_modules`.

The nice part about these `require()` statements is, similar to
`gulp` vs `grunt`, we don't have to have separate complex configuration
to ensure things are working.  The code itself drives the final output.
Each file explicitly requires what it needs to do its
work (this is good and standard in most other languages and environments),
which makes it easy for `browserify` to track these dependencies &
generate a good output.


What if we wanted to add uglify?

```bash
yarn add uglify -dev
```

```JavaScript
// import the module
const uglify = require('gulp-uglify');
// and add the pipe inside our script task:
  .pipe(uglify())
```





<!--
TODO: part 2: finish the build system
- add autoprefixer
- add concat
- perhaps do all the homework, so can less & sass? why not...
- add babel to transpile es6
- add concat to build js into a single file
- add serve  for src & dist
  - ideally with watch as well
  - use src maps to just load the /dest? not sure...
- add others from this: http://blog.rangle.io/angular-gulp-bestpractices/
- get to the point where we can start building the actual app!
- NOTE:
  - tag the repo at this point, so we can use this as a starting place for angular, react & vue.js
  - ideally can build off the same base, in branches.

TODO: part 3: angularJS (1.x) branch
- https://github.com/toddmotto/angularjs-styleguide

TODO: part 4: react branch

TODO: part 5: vue.js branch

TODO: part 6: angular (2.x) branch
-->
