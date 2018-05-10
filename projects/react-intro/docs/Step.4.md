# Step 4: Controlled Components

The next concept we should take in React is the idea of Controlled Components.
Once we have this, we should be able to consider higher state management
solutions like `Flux`, `Redux`, or `MobX`.

An HTML `<form>` and its elements naturally maintain their own state.  This
is fine, but we want to maintain a single source of truth for our data.  
The existence of state in different places in an application is often
an area where bugs eventually hide, particularly hard to diagnose buts.


## Adding a new todo form.

Lets follow-along with the [Forms](https://reactjs.org/docs/forms.html) tutorial
from the React docs.  We will alter it a bit to suit our little todo app.  
After that, we should have the tools to add checkboxes to existing todos and
change existing state.  We will have to remember that React encourages new
state over mutating existing state, so we will want to follow these conventions.

Lets make a `<TodoForm>` component.  Setup the boilerplate `/components/TodoForm`
and create an `index.js` file:

```JavaScript
// I'll prob give everyone time to struggle through this before
// showing the answer :)

// /components/TodoForm/index.js
import React, {Component} from 'react';

export default class TodoForm extends Component {

}
```

Now, to ensure we can see our changes, lets be
sure to import it to our `App.js` component and
render it out right away:


```JavaScript
import TodoForm from './components/TodoForm';

// and update render:
<TodoForm />
```


I tend to encourage working from what you know.  So, you probably know
that you need some HTML next.  Therefore, implement a `render()` function:

```JavaScript
import React, {Component} from 'react';

class TodoForm extends Component {
  render() {
    return (
      <form>
        <label>
          Todo:
          <input type="text" value="New Todo" placeholder="New Todo" />
        </label>
      </form>
    );
  }
}
```

For my implementation, I have to move `<div class="todo-panel">` up into
`App.js` to get my form inside the `todo-panel`, without having to `import`
the `TodoForm` component into `TodoList`.  This is better as you always want your
components to do one thing & do it well.  It should not be the responsibility
of the list to also house a form.  This will ensure we can easily extend the  
app later.

An OOP principle we can use from SOLID is:

O: OpenClosed principle
Entities should be open for extension, but closed for modification.

What does that mean?  In short, adding to your app should not require
rewriting existing code.  If designed well, you should be able to extend
existing entities without a lot of refactoring.  The more you refactor, the
more you should realize that shortcuts were taken earlier in the development
process due to assumptions, etc.

Of course, there are always limits. You can over-engineer anything!

So, we know that we need to be able to handle a `submit` action on our form.
We want `React` to be in control of this, so lets add it:

```JavaScript
// add a method
handleSubmit(event) {
  console.log('Submit!');
  // avoid reloading the page, a default form action.
  event.preventDefault();
}
// and reference it in the render
<form onSubmit={this.handleSubmit}
```

Does it work? It might not, because we have to
[bind the function](https://reactjs.org/docs/components-and-props.html#es6-classes)
in our non-existing `constructor`:

```JavaScript
constructor(props) {
  // always gotta call super
  super(props);
  // This is the current recommended approach in React docs
  this.handleSubmit = this.handleSubmit.bind(this);
}
```

Why?  Because React is deliberately being "not magical".  Our classes are
pure JavaScript classes, and this strange behavior is vanilla JavaScript
behavior.

Lets compare:

In classical languages like `Ruby`, `Java`, etc, `this` will always point
to the object where your method was *defined*.  This is intuitive, but
less flexible.  JavaScript is extremely flexible.  In JavaScript, `this`
will point at the object context where your function was *called*.

Want some more reading on this?  [Give this post a shot](http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/).  This will cover the difference between the *method invocation pattern* and
the *function invocation pattern*.

React previously had a `React.createClass()` function that did some automatic
binding for you behind the scenes, making JavaScript classes act a bit more
like classes in other languages.  But, this is magic, and React wants you
comfortable with vanilla JavaScript.  So the method has been deprecated.

So the key is to remember that the `this` keyword depends on how a function is
called, not on how it was created.  React is relying on plain old JavaScript
here, which to many is a good thing (and to many is terrible).  

If our `<TodoForm>` grows, and we eventually pass `this.handleSubmit()` to
a child component, the `this` will refer to that child component, and it will
"borrow" the `<TodoForm>` function, but call it with a `this` that references
the child.  `this` can easily move.

Calling `.bind(someObject)` makes a copy of a function.

In a `constructor`, `this` will refer to "The new object created right now".  
Ie, if we create `<TodoForm /> <TodoForm /> <TodoForm />`, we will create
3 instances of the form, and each time the `constructor` will run.  The `this`
will refer to "this particular form" when it runs, and if we call
`this.someFunc.bind(this)`, we are using `.bind` to make a copy of the `class`
function that is permanently `bound` to this particular form, so `this` within
the function will always refer to `this instance` of the form, no matter what
other child component we might pass the function to (in `render`).  

Thats a bit to swallow.

But, now we can pass the function to children (if we need to) and not be
surprised that `this` value changed in a new context.  `.bind(this)` ensures
that the context can never change again.

Thats long, but important. And its vanilla JavaScript, so know that once
it sinks it, it will travel with you for as long as JavaScript exists and is
in use as a language.

Ok, so now that we have a bound function, we want to get React to
handle the state, right? So, we should reference the `input` `value` from
a `state` object.  So we should create a `state` object!  If you remember
from last time, we always create initial state in the `constructor`:


```JavaScript
// /components/TodoForm/index.js
constructor(props) {
  super(props);
  // we create state in the constructor as a plain object.
  // everywhere else, we call this.setState() to update it.
  this.state = {
    value: ''
  };
  // and ensure this copy of this function always references
  // this copy of the TodoForm that we create.
  this.handleSubmit = this.handleSubmit.bind(this);
}
```

Ok, if all is well, we should be able to submit the form and see a
`console.log`, but we should also log the `value`:

```JavaScript
handleSubmit(event) {
  console.log(`The value is: ${this.state.value}`);
  event.preventDefault();
}
```

Didn't work?  Well, we probably need to add a `change` event listener to
the `input`, to let `react` know that the `value` has changed, and then
update the `state`.  Remember, we are doing this to ensure that React is
the source of truth (of the state of our app):

```JavaScript
const {text} = this.state.todo;  // todo.text
<input
  type="text"
  // set th value to this.state.value
  value={text}
  // and we better have a function to handle changes
  // as the user types:
  onChange={this.handleChange} />
```

Just like our last function (consistency!) lets bind it in the `constructor`:

```JavaScript
// at this point, your constructor should look a lot like:
constructor(props) {
  super(props);
  this.state = {value: ''};

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
```
If you keep your form components simple & use consistent naming, you'll find
a lot of your components are nearly identical in many ways.  Especially if we
extract out the business logic into `actions` or `helpers` that we `import`.

Now, lets add the `handleChange` function:

```JavaScript
handleChange(event) {
  // the event.target should be the input, and it has a property value.
  // we will just use that & set it to state in React.
  // with the one-way data binding, React will impress that back on the
  // input due to <input value={this.state.value}>, which shouldn't actually
  // change anything.
  this.setState({value: event.target.value});
}
```

Note that you can now enforce `validation` or manipulate the user input
if you need to.  Be careful with this, of course!  

```JavaScript
handleChange(event) {
  this.setState({
    // ha! upperCase it all... or don't.
    value: event.target.value.toUpperCase()
  });
}
```

Let's ensure we can add additional `<inputs>` to our form in the future
by adding a `name` attribute.  Its a good idea to match the `name` to the
`model` data value.  We will use `text` which we will pass to `todo.text`,
so we will need to update our `constructor()` `this.state` as well as
any of our existing `setState()` functions to use a `todo {}` object:

```JavaScript
const {text} = this.state.todo;

<input
  type="text"
  name="text"
  // set th value to this.state.value
  value={text}
  // and we better have a function to handle changes
  // as the user types:
  onChange={this.handleChange} />
```

Ok, now we can update our `handleChange` and ensure it pays attention to
the `name`:


<!---
TODO: continue from here! -------------------------------
TODO: continue from here! -------------------------------
TODO: continue from here! -------------------------------
TODO: continue from here! -------------------------------
TODO: continue from here! -------------------------------
TODO: continue from here! -------------------------------
---->


```JavaScript
handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    // lets update setState() to use a {todo} that
    // looks a lot like one from our `public/_mocks_/todo.json`,
    // so we don't have to manipulate the structure elsewhere.
    todo: {
      [name]: value
    }
  });
}
```

What was `[name]` ?  This is similar to [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment),
but it is called [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names).

So remember to update your constructor to match:

```JavaScript
constructor(props) {
  super(props);
  this.state = {
    // so we can add 'id' and 'complete' and other properties
    // easily
    todo: {
      value: ''
    }
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
```

Homework:

Great, now our form is functional.  But we want to `submit` the form and:

- pass the todo to the list
- render the new todo in the list
- empty out the existing form to prepare it for a new todo

How should we go about doing this?

I'll push the solution soon, but give it a spin and see if you can use
your existing toolset to figure out how to accomplish this goal!


<!--
  Notes for next steps:
  https://reactjs.org/docs/lifting-state-up.html
  review/reinforce the idea of lifting state up
  to the highest shared parent component, at least
  before jumping into something like Flux/Redux
-->
