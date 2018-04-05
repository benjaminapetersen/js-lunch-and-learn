# Building Components

## Comparison to AngularJS

Now, lets all have a moment of silence and remember Angular's directive
syntax:

```JavaScript
angular
  .module('myApp')
  .directive('MyComponent', [
    function() {
      return {
        restrict 'E' // cuz its an element
        scope: {
          text: '<'  // one way data binding. I think. I forget which glyph.
        },
        templateUrl: '/some/path/to/something.html',
        // complex logic goes here...
        controller: [function() {

        }],
        // DOM manipulation goes here..
        link: function($scope, $elem, $attrs) {}
      }
    }
  ]);
  // thats a lot of ceremony to make a component!  No wonder
  // angular components tend to get rather large, who wants to write
  // all that over and over.  16 lines so far and our directive still
  // doesn't do anything.  An Angular Component is less painful, but
  // still looks pretty similar.   
  // In addition, the glyphs used to define scope are just not memorable.
  // scope {} needing <,>,&,?, etc. confuses just about everyone.
  //
  // Having said all that, Angular did have it's day, and it did move
  // us forward, so I probably shouldn't be so hard on it. :)
```

## TodoList Component

Lets go with our tradition of making a todo list:

```JavaScript
import React from 'react'; // wait a minute, do we use React?
```

A quick note.  Though we don't use `React` directly, we must `import` it.
React has to be in scope of all of our components for things to work.

Onward...

```JavaScript
import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    // why the parens by the return?  Cuz then we can balance our <div></div>
    // and not worry about JavaScripts automatic semicolon injection
    // causing our render method to return NOTHING.
    return (
      // confused?  example below:
    );
  }
}
```

The convention of the parens in the `return`:

```JavaScript
  render() {
    return; // uh oh! The JS engine will put a semicolon here automatically.
      <div>
        stuff...
      </div>
  }
```

You can also:

```JavaScript
return () {
  return <div>
   stuff....
  </div> // yuk. this is not balanced.
}
```


Ok, back to a list:

```JavaScript
import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    // why the semicolons?  Cuz then we can balance our <div></div>
    // and not worry about JavaScripts automatic semicolon injection
    // causing our render method to return NOTHING.
    return (
      <h1>Todos</h1>
      <ul>
        <li>Do this</li>
        <li>Do that</li>
        <li>Do other things</li>
      </ul>
    );
  }
}
```

Ok, so we have a hard-coded list.  How can we make this dynamic?

There are a couple ways:

```JavaScript
render() {
  const todos = ['Do this', 'Do that', 'Do other things'];
  const elems = todos.map((todo) => { <li>{ todo }</li> });
  return (
    <ul>  
      { todos.map((todo) => {
        <li>{todo}</li>
      }) }
    </ul>
  )  
}
```

or

```JavaScript
render() {
  const todos = ['Do this', 'Do that', 'Do other things'];
  const elems = todos.map((todo) => { <li>{ todo }</li> });
  return (
    <ul> {elems} </ul>
  )  
}
```

```JavaScript
import React, { Component } from 'react';

class TodoList extends Component {
  render() {
    // first we need to extract the actual data out of the DOM
    // so that we can work with it!
    const todos = ['Do this', 'Do that', 'Do other things'];
    // remember, fat arrow functions have implicit return if they
    // include just a single expression
    const elems = todos.map((todo) => { <li>{ todo }</li> });
    // JSX will unpack arrays of nodes automatically.
    return (
      <h1>Todos</h1>
      <ul>
        {elems}
      </ul>
    );
  }
}

// gotta export to use it!
export default TodoList;
```

# Props:  how to pass information to your components

While we are at it, lets make a `Todo` component:

```JavaScript
import React, { Component } from 'react';
// we should import our styles here if we do any css!

// we can also inline the export:
export default class Todo extends Component {
  render() {
    // lets use destructuring to get our individual properties!
    const { id, text, complete } = this.props;
    // a hacky checkbox
    const isDone = complete ? '[x]' : '[ ]';
    return (
      <li
        id={`todo-${id}`}
        key={id}>{text} {isDone}</li>
    );
  }
}

```

Then we can import and use our todo:


```JavaScript
import React, { Component } from 'react';
import Todo from './todo';

class TodoList extends Component {
  render() {
    // now we are using objects with a tad more data
    const todos = [
      { id: 1, text 'Do this', complete: false },
      { id: 2, text 'Do that', complete: true },
      { id: 3, text 'Do other things', complete: false }
    ];
    // implicit return...
    // and the spread operator, which is kind of like destructuring!
    // the {...} todo means it will individually pass each property
    // without us having to specify key=value pairs.
    const elems = todos.map((todo) => { <Todo {...todo} > })
    // JSX will unpack arrays of nodes automatically.
    return (
      <h1>Todos</h1>
      <ul>
        {elems}
      </ul>
    );
  }
}

// if you don't export it, you can't use it
export default TodoList;
```

A quick note, you can loop a few ways in JSX:

```JavaScript
// you can loop directly within the template:
render() {
  return (
    <ul>
    todos.map((todo) => {
      <Todo {...todo} >
    });
    </ul>
  );
}
// or you can do what we did above, create the map outside
// the actual return, and just insert via variable:
render() {
  const todos = [{},{},{}];
  const elems = todos.map((elem) => { <Todo {...todo} > });

  // this keeps the actual output a tad simpler, but
  // as things get more complex it may be harder to read
  // the above code.  
  return (
    <ul>
      { elems }
    </ul>
  );
}

```

How do we manage the complexity?  Facebook, the creators of React,
[supposedly has 30,000 components](https://github.com/facebook/react/issues/9463#issuecomment-295643228).
That definitely implies that they make very small components, that do
very specific things.  If your component gets too bit to understand,
its probably time to break it up into smaller components.  We just
made a `TodoList` and a `Todo` component.  Neither does much, but thats
the point.  It should be simple to add additional functionality w/o having
to refactor a ton.  

In Object Oriented Programming, there is an acronym [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design), of which
we are pulling two concepts:

- [S](https://en.wikipedia.org/wiki/Single_responsibility_principle)ingle Responsibility principle
  - Every component should have a single responsibility over a single part of the functionality
- [O](https://en.wikipedia.org/wiki/Open/closed_principle)pen/closed principle
  - Entities should be open for extension, but closed for modification.

The implication here is that a well-designed system, when adding functionality, should
require very little refactoring.  It should be easy to add additional functionality
w/o fear of breaking the system.  We don't want to over-engineer, on the contrary, we
want to design components that are future proof.  It should be easy to add
new functionality to the application without rewriting old functionality.

### Lets render our list!

So its bad to do this much code w/o actually putting it on the page.  Lets
load it up into the `App.js` component and see what we get:

```JavaScript
// add this at the top of App.js below the other imports
import TodoList from './TodoList';

// then add a TodoList in the render method somewhere:
render() {
  return (
    // somewhere....
    <TodoList />
  )
}
```

### Styling our completed Todos

Our Todos dont actually have any interactive function yet (users cannot toggle or
create new), but we can at least style the card-coded completed todos.  Lets create
a CSS file:

```css
/* ./Todo.css */
.todo.complete {
  color: #84e88d;
  text-decoration: line-through;
}
```

And import it into our Todo:

```JavaScript
// at the top
import './Todo.css';

// then update our render to conditionally apply the `complete` class:
render() {
  return (
    <li
      id={`todo-${id}`}
      className={`todo ${isCompleteClass}`}>
      { text } {isDone}
    </li>
  );
}
```

If done correctly, you should have at least one green todo with a strikethrough. Woot.

Alternatively, we can do inline styles instead of
importing the CSS from an external file:


```JavaScript
import React, {Component} from 'react';

export default class Todo extends Component {
  render() {
    var styles = {
      color: complete ? '#84e88d' : '',
      textDecoration: complete ? 'line-through' : ''
    };
    return (
      <li
        id={`todo-${id}`}
        className={`todo ${isCompleteClass}`}>
        { text } {isDone}
      </li>
    );
  }
}
```
