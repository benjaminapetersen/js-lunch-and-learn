# Step 3

Going deeper with `state` and `props`.  

At this point, I trust that everyone has styled their
todo list to look pleasant.  Feel free to use the [TodoMVC App CSS](https://github.com/tastejs/todomvc-app-css), or
just roll your own.  For the purposes of this tutorial, I'll be rolling
my own to illustrate the experience of using `import ./index.css` and
CSS-in-JS, common concepts used in current React development.

My update is going to be to add `TodoList/index.css` which is:

```css
.todo-panel {
    border: 1px solid #ccc;
    background: #f3f3f3;
    border-radius: 4px;
    margin: 20px;
    padding: 20px;
    text-align: left;
    box-shadow: 0 1px 3px 2px rgba(0,0,0,0.1);
}

.todo-list {
  list-style-type: circle;
}
```

## Some housekeeping

Lets be sure to tidy up.


### Better tab names in Atom

Using the `Folder/index.js` and `Folder/index.css` pattern is nice in that
you don't have to be as explicit in your `import` statements, but its not nice
when you can't tell what file you are editing.  You can go the route of  
only opening one file at a time, or you can update your editor settings.  If
you are using Atom, I recommend the `foldername-tabs` package.  

### Moving files around

So we have a few files, and I already feel overwhelmed.  This `/src` folder is a disaster
in the works.  Lets NOT LET IT BECOME A DISASTER and do some cleanup.

So currently:

```bash
/src
  |_ App.js
  |_ App.css
  |_ App.test.js
  |_ etc.
  |_ etc.
```

Flat is bad.  Flat means we will have a thousand files in one long list soon.

So, lets start with:

```bash
/src
  |_ /components
    |_ /Todo
        |_ index.js
        |_ index.css
    |_ /TodoList
        |_ index.js
        |_ index.css
    |_ /NonJSX
```

And go from here.  There is nothing keeping us from nested directories.  Generally, if
a component will only be used within another component, give it a nested directory.  

The `index.js` lets us `require(../Todo)` and it will load the default `index.js`,
which, if it `exports default`, then we are especially in good shape!


## Hot module replacement

Enabling hot module replacement means we can change code & our app will refresh without
actually reloading the browser.  This is both faster, and means our console won't get cleared
every reload (though you can also set that via a checkbox in the chrome developer console).

All we do is add this:

```JavaScript

// src/index.js
// somewhere at the bottom:
if (module.hot) {
  module.hot.accept();
}
```

Now, try adding a console.log or two.  Nifty.

## State & Props

Soon we will want to externalize our TODOs & fetch them, probably form
some kind of API.  In the interim, we can use `_mocks_` and just have a
JSON file within our project. This is a good practice for a variety of
reasons.  However, since we first want to learn React, lets dive into
two key concepts: `State` and `Props`.

### Props

Dive deeper into [Components and Props](https://reactjs.org/docs/components-and-props.html).

We began using props at the end of the last lesson.  When we updated our
`todo` generation to this:

```JavaScript
const elems = todos.map((todo, i) => {
  // we are passing props!
  return <Todo key={i} {...todo} />
});
```

Think about props just like arguments to a function.  If you remember, its
perfectly acceptable react to actually create a component function:

```JavaScript
// a standard function might look like:
const Greet = (name) => {
  return `Greetings, ${name}`;
}

// Now lets make a functional component
const Greet = (props) => {
  return (<div>Greetings, {props.name}</div>);
}

// we can use a little more fancy and
// destructure the props object argument if we want to!
const Greet = ({name}) => {
  // and a template literal!
  return (<div>{`Greetings, ${name}`}</div>);
}

// using this component would look something like:
const element = <Greet name="Franco" />;
ReactDOM.render(
  element,
  document.getElementById('root');
);

// inside our App component we can use it numerous times:
const App = () => {
  return (
    <div>
      <Greet name="Jane" />
      <Greet name="Janet" />
      <Greet name="Jack" />
    </div>
  );
}

```

So props can be thought of as arguments to a component, parallel to
arguments to a function.  This is a reasonable analogy and you should
get a good bit of mileage out of it!

Applying this to our current app, lets move our `props` all the way up to
our `App.js` component.

```JavaScript
// TodoList.js
render() {
  const {todos} = this.props;
  const elems  = todos.map(/* prev stuff */);
}

// App.js
render() {
  const todos = [/* todos go here */];
  return (
    <TodoList todos={todos} />
  );
}

```

### HTTP request for _mocks_

The next thing we will want to do is load up our `todos` via our `_mocks_` directory.  For simplicity, we will put the `_mock_` dir
inside our `public` folder so that its easily accessible. Create
`public/_mock_/todos.json`.

Then, copy your array of todos in there:

```JSON
// public/_mock_/todos.json
// NOTE: JSON is picky!  double quote all strings.
[
  { "id": 1, "text": "Do this", "complete": false },
  { "id": 2, "text": "Do that", "complete": true },
  { "id": 3, "text": "Do other things", "complete": false }
]
```

Ok, now, lets update our `App.js` file to show a `loading` until
we get some data back.  

```javascript
render() {
  // remove <TodoList /> for now
  return (
    // you could even reuse that nifty spinning react logo...
    <div> Loading.... </div>
  );
}
```

Now, we only want to load our `todos` once, and we want to do that
when React creates the `Component` and inserts it into the DOM.  
Therefore, lets use the `componentDidMount()` method:

```JavaScript
// in App.js
componentDidMount() {
  // get data here... how?
  // lets use:
  fetch('some/data/from/somewhere!');
}
```

In order to make an http request, lets use the `fetch` api. Its new,
not ready for prime time yet, but it replaces `XMLHTTPRequest`. Makes
sense, since we don't really use XML as the primary data language of
the web.  There are a number of options, of course.  We could use  
good ol' `jQuery`, or some newer libary like `axios`.  However, `fetch`
will be a browser standard, so lets give it a spin.

```JavaScript
// we are going to add a fetch like this:
// since /_mock_ is inside /public, and our server already
// serves everything in /public, we don't need to configure
// much.
fetch('_mock_/todo.json')
  // fetch() is promise based, so we get to .then() it.
  // promises encapsulate the concept of future actions.
  // assume that *time has passed* before the next thing
  // can happen, which will be the .then()
  .then((response) => {
    // if we got a response, log it!
    console.log(response);
    // ok... not helpful.
    // now do this:
    return response.json();
  })
  // and chain again
  .then((result) => {
    // aha, this is real data.
    console.log(result);
  });
```

#### Wups, something went wrong?

Uh oh, errors?  If you see something explode that looks like:

```html
Unhandled Rejection (SyntaxError): Unexpected token < in JSON at position 0
```

Then you probably have an incorrect URL.  Our setup doesn't 404
super gracefully. If you are wondering a bit more about `fetch`, and
want to know how to handle errors, [Give this a try](https://www.tjvantoll.com/2015/09/13/fetch-and-errors/).

If you are really interested in playing with `fetch` and seeing
response codes, you can try something like this:

```JavaScript
// some server out there that will return response codes
fetch('http://httpstat.us/500')
  .then((resp) => {
    console.log('got a response... is it ok?');
    if(!resp.ok) {
      console.error('OOOP, not ok!');
    }
    // oh look, all the things you can log....
    console.log(response.headers.get('Content-Type'));
    console.log(response.headers.get('Date'));
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.type);
    console.log(response.url);
  })
  .catch((err) => {
    console.log('500');
  });
```

Ok, if you are getting data back, thats great. If it is your array
of todos, thats especially great, thats what you want. Now... how
to update our UI?

### State

Go deeper with [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html).

So far, all of our components have been basically stateless. Sometimes we call
these "dumb components". This is because it just renders out whatever they are given,
they don't know anything on their own.  The more dumb components the better.

But, apps have to do things in order to be useful.  Generally this means something
has to own state.

React docs can tell you all about [Component State](https://reactjs.org/docs/faq-state.html).

- both Props and State are plain JavaScript objects `{ }`
- both influence what the component will render
- however
  - props are passed to a component
  - state is managed within the component

Conceptually, React enforces one-way data binding, not two-way, like many other
frameworks (such as Angular).  This simplifies the app & makes it easier to reason
about, similar to how driving on one side of the road makes it a lot easier to not
die on the way to work.  

Avoiding state also makes your app easier to reason about.  But once we get to
needing it, this is how it works.

We need to set an initial state on our component.  This is pretty easy:


```JavaScript
// App.js
class App extends Component {
  // lets add a constructor
  constructor(props) {
    // always call the parent constructor, this just means use super()
    super(props);
    // now, we just use a plain JavaScript object and call it 'state'
    this.state = {
      error: null,      // can't hurt to track
      isLoaded: false,  // toggle our loading spinner
      todos: []         // and attach our actual data
    }
  }
}

```

Next, we want to update that `componentDidMount()` function with a `setState` call.
Why?  Why can't we just update `this.state`?  Because React meticulously tracks
state throughout our app to take care of all kinds of things, like performant rendering.
So instead of editing state directly, we will call `setState()` and give it some
new state.

`setState()` is also asyncronous.  Each call is `batched`, meaning it is possible that
it could be called multiple times before an actual `render` cycle.  This is great for
performance as `rendering`/manipulating the DOM is the most expensive task in a web app
(odd... cuz a browser's main job is to display HTML? You'd think it would be easy?).

```JavaScript
// App.js
componentDidMount() {
  console.log('Did we mount?');
  // if you would like, you can fuss with the headers of your fetch.
  // lets not worry about it unless its necessary.
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json'
  // };
  // fetch('_mock_/todos.json', headers)
  fetch('_mock_/todos.json')
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      // ok, we can setState here!
      // so long as we use arrow functions, we can use the
      // this keyword.
      this.setState({
        isLoaded: true,
        todos: result;
      });
    }, (error) => {
      console.error(error);
      this.setState({
        isLoaded: true,
        error // es6 property shorthand!
      });
    });
}
```

Ok, our `fetch()` will return *at some point in the future*, and then we
can update our DOM.  using `setState()` will cause React to do a `render` and
our component can output new HTML.  

```JavaScript
// App.js
render() {
  const { error, isLoaded, todos } = this.state; // destructure
  return (
    // header, app-logo, etc

    // valid *expressions* can be used in JSX syntax.
    // a simple way to think about an expression is this:
    // - an expression returns a value.
    // so:
    // { variableName }  works, it will print a value
    // { foo ? 'Yay' : 'Sadness' } works, it also returns a value
    // if statements & other controls don't work, they don't
    // return a value.  However, using &&, ||, etc will work 
    { isLoaded ? (
       <TodoList
         title="Things to do"
         todos={ todos } />
    ) : (
      <div>Booo</div>
    )}
    { error
      &&
        <div>Bad: {error.message}</div>
      ||
        <div>Good: no errors</div>
    }
  );
}
```

Things to consider to make this more robust:

- If our App.js component was unmounted, we should cancel the `fetch`.
- Consider giving `setState()` an arrow function to ensure the asyncronous render
  doesn't break!

Its worth noting, that `setState()` can take a function.  This is really useful
if each update of state really depends on the last update:

```JavaScript
// if you use a function, you get prevState as well!
this.setState((prevState, props) => {
  // remember, always return new!
  return {
    ...prevState, // woot, can extend prevState
    newStuff: 'things'
  }
});

```


To do some more with `setState()`, take a look at [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html) in the React docs.
You could use that tutorial and make the `<Clock />` component (its more like a
timer) to show times on our `TodoList` or `Todo` items.  


Up next! Lets make the todo items interactive with a working form.


<!--
Step.4.md
  - swap axios for fetch, fetch is annoying maybe?
  - make working checkboxes w/callbacks
  - consider adding the timer component from
     - https://reactjs.org/docs/state-and-lifecycle.html
     just to work out a bit more with setState()
  - press forward to flux/redux
-->
