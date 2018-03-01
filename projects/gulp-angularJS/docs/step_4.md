# Step 4: Components

Last lesson we did the following:

- Created our main module `todoApp`
- Instantiated our app on the page with `ng-app="todoApp"`
- Created a few Routes  
  - `/todos` for our todo list
  - `/` to redirect to `/todos`
  - and we made an `.otherwise()` to catch everything else & route to `/todos`
  - this is so we don't have to move things around later if we decide to
    add a settings page, or anything else.  The router is pretty minimal to
    setup, so we might as well get it done early.
- Created a `<todo-list>` component to list our todos.
- Created a `todo-list.html` template file for our component
  - A big difference between `React` and `AngularJS` is that `AngularJS` still
    uses external template files for generating HTML.  
  - NOTE: this is a developer experience detail.  BOTH frameworks (and all modern
    frameworks) transform templates into JavaScript functions, no matter where the
    actual HTML lives.  This is 100% about creating a development environment that
    is productive, this is not about "clean" html.
    - Both treat the HTML differently
    - React, as far as I've seen, does a better job (by far) of generating clean
      HTML artifacts.  Angular logic is permanently mingled into the HTML you ship,
      meaning it won't pass a validator. React is JavaScript first, and seems to
      do a better job rendering out valid markup.  Admittedly this is my assessment
      having far less experience with React, but so far its been a very clear difference.


## TODOS: A component based AngularJS architecture

We are going for a component based architecture, as is the trend for most modern
applications.  Therefore,

Our route to `todos` looks like this:

```JavaScript  
// hitting /todos will trigger the following
.when('/todos', {
  // we will render into index.html in the <ng-view> node the
  // following template:
  // What is nice here is that we could easily change this to <todo-page>
  // and put the <todo-list> inside.  There is
  template: '<todo-list todos="$resolve.todos"></todos-list>',
  // resolve is used to get data into the above template
  // this is nice because the components above can be "dump", they only
  // know how to render what they get.  This makes them far easier to test.
  // on the flip side, its a bit more ugly as it adds a bunch of logic to our
  // routes.  
  // Long term, I would suggest instead using a <todo-page> component, ONLY
  // for making $http requests or whatever to get data & passing it into the
  // specific components.  This would keep our routes clean but still keep the
  // majority of our components "dump".
  resolve: {
    todos: () => {
      // we will, for now, hard code todos here.
      // the next step will be to move them out into a separate JSON file,
      // and use $http to retrieve it.
      // Then, we will want to actually connect to a back end service.
      return [];
    }
  }
});

```

However, the above might be a tad confusing, so lets work backwards from the
UI layer.  It will be easier to make a `<ul>` with some hard-coded list items,
then extract out the data.
