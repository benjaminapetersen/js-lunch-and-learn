# Step 3:  Coming Soon


## A Little Housekeeping

If your editor is complaining about ES6, try adding either `eslint` or `jshint` to
your project.  `jshint` is a tad legacy, but the `.jshintrc` file in the root of your  
project would look something like this:

```JavaScript
{
  "esversion": 6,
  "globals": {
    "require": true,
    "__dirname": true
  }
}
```

For the sake of keeping up with current tools, I would recommend `eslint`.  An example
of an `.eslint.json` file:

```JavaScript
{
  "parserOptions": {
    "ecmaVersion": 6,
  },
  "env": {
    "browser": true,
    "node": true
  }
}
```
I'm tempted to encourage you to use a YAML version, as it is a bit less of a pain to
type.  In this case, you can use an `.eslintrc` file looking something like:

```yaml
---
parseOptions:
  ecmaVersion: 6
env:
  browser: true
  node: true
```

Isn't that all pretty and stuff?  Here is a decent list of [available options](https://gist.github.com/alefteris/39c9cfe3a6baa9fc5acf).




<!--
TODO:
- look at "what next" from step_1.md.  more or less:
- add build for sass, js
- ensure inject works for /src with all the individual files
  - gulp-inject will do this
  - the 'name' option will allow us to use named injection points
    for vendor, etc
- ensure inject works for /dist after we build/minify
- ensure we can serve both /src and /dist so that we can verify
  everything works as expected, both before and after minification!
  - either with a /dev and a /dist prefix
  - OR using ports: 3000 and 3001
    - ports may be easier, path manipulation is always a tad messy
-->
