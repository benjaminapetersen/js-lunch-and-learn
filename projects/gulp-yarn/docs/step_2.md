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

Browserify is one of a number of tools that will trace imports.  An alternative
called `webpack` is a bit more popular in the current environment, but is also know
to be quite difficult to configure. An older tool called `require.js` does similar
things.  Since we prefer to understand what our tools do, we will be using browserify
in this tutorial.

Installation is easy, we drop it in just like all of our other dev packages:

```bash
# NOTE: there is a plugin called gulp-browserify that simplifies things,
# but it is deprecated.  Therefore we need 3 packages and will have to know
# a bit more about plumbing than I would like, but it offers some insights into
# the world of the file system and node.js
yarn add browserify -dev
# browserify returns a text stream.  gulp & other gulp plugins expect
# a different kind of stream, so we will use this plugin to convert
yarn add vinyl-source-stream -dev
# and certain plugins expect buffered file objects, so we need this plugin
# to do a little bit more conversion.
yarn add vinyl-buffer -dev
```

### Streams

The [Node.js API page](https://nodejs.org/api/stream.html) says that
"Streams are an abstract interface for working with streaming data
in Node.js".  Thats only somewhat helpful.  

[This article](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93) is more helpful.  Essentially "streams are a
collection of data--just like arrays or strings".  The big difference
between a stream & an array or string, is that a stream *might* not
be available at once.  It may not even entirely fit in memory!  This
is a key feature, however.  For example, when we want to load &
process many files in a large project, we want to know that we can
process chunks at a time & that memory should not be a constraint.

Streams also let us control inputs and outputs, or redirect & compose
our code.  The analogy of water flowing like a river is correct.  Water
can flow in various directions, branch off, and is never available in
one place at one time.  

In linux land, we `pipe` commands from one command to the next.  Our
streams in `node.js` can also "flow" through pipes.

Another advantage here is that we don't have to have a `/.tmp`
directory to dump outputs between commands.  Since we can pipe one
command into another, there is no need to repeatedly read then write
files.

### Gulp streams

Ideally, streams would be abstract, a single idea of a stream, with
no need to know whats actually inside it.  This is how I have always
thought of streams, but it is unfortunately not entirely accurate (big
surprise).  Gulp, as a task manager, has to work with at least a couple
stream types:

- file streams
- text streams
- buffer streams

Gulp uses an intermediary called `vinyl` (which is maintained with
gulp) to transform streams from one kind to another.  Unfortunately,
when you get an error, it is not always obvious that the problem is
just that you need to swap stream types.

I'll borrow some pseudo-code form the above article to help illustrate:

```javascript
// a readable stream can be piped to a writable.
// ie, load files, and then dump them out somewhere else.
readableSrc.pipe(writableDest);

// read file stream
readableSrc
  // change the file stream
  .pipe(transformStream1)
  .pipe(transformStream2)
  // then write the file stream
  .pipe(finalWrtitableDest)
```

## Gulp streams vs Node streams

[This article](https://medium.com/gulpjs/gulp-sips-how-we-use-streams-d7790b22bf1a)
on the gulp blog was written in an attempt to clarify some of the differences
between a Gulp stream and a Node stream.  

### Back to Gulp...

So, now that we know all the things about streams, lets use them. Knowing that gulp +
the various plugins we use may expect a couple different kinds of streams, we should
be able to pipe & transform our way to something useful.


Load up our dependencies:

```JavaScript
// gulpfile.js  
'use strict';
const gulp = require('gulp');
const browserify = require('browserify');
// many tuts call this 'source', but I'm calling it textStream per above discussion.
const textToStream = require('vinyl-source-stream');
// If file.isStream(), file.contents will be converted to a Buffer,
// otherwise the file will passthrough.
const streamToBuffer = require('vinyl-buffer');
```

Then lets use them.  

```JavaScript

gulp.task('scripts', ['clean-dist'], () => {
  // tell browserify what file to start with, so it can
  // follow all the require() and import statements &
  // load up a file tree.
  return browserify({
          entries: './src/scripts/main.js',
          debug: true
        })
        // then tell browserify to bundle it all up.
        .bundle()
        // now, lets turn this to a stream gulp usually uses
        .pipe(textToStream('main.min.js'))
        // so we can dump the built output as a single file
        .pipe(gulp.dest('./dist'));
});
```

Nice, that was pretty painless.  Now, lets add `uglify` to our flow.  Uglify
expects `buffered` objects, so we can use `streamToBuffer` (vinyl-buffer) to  
convert our stream before the transform:


```JavaScript
gulp.task('scripts', ['clean-dist'], () => {
  return browserify({
          entries: './src/scripts/main.js',
          debug: true
        })
        .bundle()
        .pipe(textToStream('main.min.js'))
        // convert to a buffer for uglify
        .pipe(streamToBuffer())
        // then just pipe it through
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));  // Bet it will error!
});

```
But... we get an error.  Not because of something with streams, but because uglify
doesn't know how to handle our es6!  How can we know that?  Well, a lot of plugins
let you do this:

```JavaScript
// lets make sure that if we get an error we log it right away.
// this will bubble up the es6 problem.
.pipe(uglify().on('error', (e) => {
  console.log(e);
}));
```

So what now?  We will have to transpile our es6 to es5 before we can minify! This
is a common thing to do anyway before we ship code to a browser.  Babel is
complicated however, requiring a `.babelrc` file and plugins, so we will
leave that for next time.
