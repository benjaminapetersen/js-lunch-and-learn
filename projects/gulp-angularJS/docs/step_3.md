# Step 3:  The App: Routes & A Page


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



## And Some Angular!

Finally, in step 3 we will add some actual AngularJS (1.x) to our page
and begin building an app.  We don't have a fully-fledged build system
in `gulp` yet, but we can continue to add tasks as we need them.  This
will help us avoid unnecessary complexity.

We are going with a component based architecture as most modern apps
do these days, regardless of the framework chosen.  There is a good
[Styleguide for Angular 1.5x Apps](https://github.com/toddmotto/angularjs-styleguide), but we won't
initially follow everything.  This guide is designed for a fairly large
application, we will keep it simpler & refactor as complexity grows.

So with all `angular` apps, the first thing to define is the module.  

```JavaScript
// src/app.module.js
'use strict';

angular
  .module('todoApp', [
    'ngRoute'
  ]);
```

The second thing to define is some basic routes.  Lets
setup the shell of routes before we define what they will do.

```JavaScript
// src/app.routes.js
'use strict';

// NOTE: many component based architectures do NOT
// have external routes like this, but will put the
// routes within components that own the route.
angular
  .module('todoApp')
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {

      })
      .when('/todos', {

      })
      .otherwise({

      })
  });
```

Give `gulp` a run and see how we look so far. These
files should automatically inject into our `index.html`
if all is well, and we should not see errors in the
console.

On load, inspect your source. It should be evident that these new files have not been added. Lets update
the `inject:app` task.

```JavaScript
// gulpfile.js
// inject:app task, update the sources
[
  // i'm using template literals here for string concat
  //this could be further factored to eliminate repitition
  `${PATHS.src}/app.module.js`,
  `${PATHS.src}/app.routes.js`,
  `${PATHS.src}/components/**/*.js`,
  `${PATHS.src}/components/**/*.css`
],
```

Ok, seems to work fine, now we need to add our Angular module
to the `index.html` page so that Angular knows to instantiate
it as the application.  This is done with the `ng-app` directive.

```html
<html ng-app="todoApp">
```

There is one more magical directive that is needed.  Add the following:

```html
<body>
  <!--
    Whenever a route changes, angular will render
    everything new within the <ng-view> on the page.
    If this directive doesn't exist, angular will do nothing.
  -->
  <div ng-view></div>
</body>
```

Now, if you update this & refresh your page, you should see a
console full of red errors. This is because we have chosen
to use `ngRoute` without installing the dependency.  So
lets add that.

```bash
# ensure it updates your package.json
yarn add angular-route
```

Update our `inject:vendor` task

```JavaScript
[
  `${PATHS.deps}/lodash/lodash.js`,
  `${PATHS.deps}/angular/angular.js`,
  `${PATHS.deps}/angular-route/angular-route.js`,
  `${PATHS.deps}/todomvc-app-css/index.css`,
```

And run `gulp` to rebuild.

Now, lets add a redirect to our routes to ensure we
always land on the `todos` page

```JavaScript
// app.routes.js
.when('/', {
  redirectTo: 'todos'
})
.when('/todos', {
  // but what are we going to do here?
})
.otherwise({
  redirectTo: 'todos'
})

```

Finally, we need to decide what to do in our `/todos` route.
Since we are going component based, we are simply going to
load a template, which will instantiate a component.  Update it to look like this:

```JavaScript
.when('/todos', {
  template: '<todo-list></todo-list>'
})
```

Now we need to create the `<todo-list>` component so that
we can generate something on the page.

```JavaScript
// src/components/todos/todo-list/todoList.component.js
'use strict';

// we include this first part because we are always
// adding components to our module (our app).  This is
// the concept of a namespace.
angular
  .module('todoApp')
  // then we can call the .component() function to
  // create a component.  It takes 2 things:
  // - a string that represents the component name
  //   - NOTE: you will camelCase the name todoList, even
  //     though when you actually use it in html you will
  //     instantiate it <like-this> as <todo-list>
  // - an object, with specific properties that define
  //   the component's behavior
  .component('todoList', {
    templateUrl: './todo-list.html'
  });
```

```html
<!-- src/components/todos/todo-list/todo-list.html -->
<ul>
  <li>say hi</li>
</ul>
```

Of course, we loaded up the `todomvc-app-css` dependency, so lets make sure to use it to style the app.  Its a good
time to pause and add some markup to the page.  We can do
the initial work right in `index.html` to build our the
template, then we will cut and paste into specific
components.

Time to kill the server & run `grunt` again to see if our
new component is included & renders anything on the page. Check
your `index.html` to ensure the new `todoList.component.js` is included.

Nothing rendering?  Lets add a `console.log` to see if the
component is instantiated. To do this, we need to give the component a
`controller`.  The controller is simply the function that controls the
component.

```JavaScript
'use strict';

angular
  .module('todoApp')
  .component('todoList', {
    templateUrl: './todo-list.html',
    controller: function() {
      console.log('hello world?');
    }
  });

```


## Homework


1.  Style the app so that it matches those from [TodoMVC](http://todomvc.com/).
    You should not have to write (much) css by hand, we have included the appropriate dependencies.
1.  Create a `<todo>` component that will be a child of `<todo-list>`. The
    list will have many children
1.  Create an array of todo's (somewhere, perhaps in the todoList controller)
    and see if you can cause `angular` to generate multiple `<todo>` items
    based on this list. This will require a little bit of research around
    some basics of angular.
1.  Once you have a list, remove the array of items from the `todoList`
    controller.  We want it to be pure & accept its todo items as an
    attribute.  You can add a `resolve` function to the `todos` route
    in `app.routes.js` and return the todos as a named property, then
    pass them to the template.  It will look something like this:

    ```JavaScript
    .when('/todos', {
      template: '<todo-list todos="$resolve.todos"></todos-list>',
      resolve: {
        todos: () => { return []; }
      }
    })
    ```

<!--
TODO:
- eventually build sass/less for our css (if we need it)
- add a transpiler for es6 to es5?
- build the dist & provide a `serve` task so we can
  optionally serve either `src` or `dist` (or both).
  - dist should include minification/concatenation
  - can use localhost:3000, localhost:3001 or
    localhost:3000/dev localhost:3000/dist

APPLICATION
- store todos in local storage
- implement new, update, delete todos
- implement nested todos
- implement filtering of todos
  - could add create date, due date, etc.
- consider using a mongo db or something more persistent
- add some kind of login logic so we can store user specific todos
  - could be simple to just ask for a username
  - could actually use google/fb
-->
