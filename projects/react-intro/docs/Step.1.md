# Intro to React

This week we are going to get started with React.  Rather than worrying about
setting up all of the build tools (which we should learn about eventually),
we can instead use a handy tool called [Create React App](https://github.com/facebook/create-react-app).
Whats interesting is that we don't even have to install it!

If you have a version of `npm` that is at `~5.0`, then there is an additional tool
that has been installed automatically.  It is `npx`.  It is a cli tool that runs a
package that you don't explicitly have to install and maintain, perfect for those
packages you will use only once in a long while.  

So, `cd ~/some/place/where/you/store/projects` and:

```bash
npx create-react-app react-intro
```

Great.  All installed, you should note that your `node_modules` folder comes in
around `175mb` in size.  This means that there are a LOT of tools ready to roll.

Now:

```bash
# start the server
yarn start
# build for production
yarn build
# test!
yarn test
# eject? we will get into this later.
yarn eject
```

Give `yarn start` a spin.

# A quick tour

Despite the hefty node modules folder, the app is pretty slim.  You have your
standard `package.json` and two folders, `/src` and `/public`.  

## /public

The public directory is for very, very little.  We might be tempted to put images
or css in this directory, but for the most part it is going to hold only the `index.html`
file.  

## /src

Let's start with the `index.js` file.  By convention, `index` is the entry point of a
web application.  This contains the single line that kicks off our app:

```JavaScript
ReactDOM.render(<App />, document.getElementById('root'));
```

the `/public/index.html` file has a `<div>` with `#root`.  We are setup with a document
query to select this element, into which `React` will render our first component, by
convention, called `App`.  There is nothing special or fancy about the `App` component,
it functions just like any other React component.

### Some syntax

If you have worked in `node.js` before, you have probably ran into `require()`.  
Create React App set us up with `Babel`, a transpiler, that allows us to use `es2015`, and
even some newer features.  One of these features is `import`.

```JavaScript
import React from 'react';
// roughly equivalent to:
const React = require('react');
```

`Import` allows us to declare our dependencies.  This is not the same as `Angular`
dependency injection. If we used it, it would look something like passing a function
to a React component, and the component would call the function.  We will likely
pass functions a lot.  However, it is less common to pass larger, complex objects like
Angular Services (as far as I understand, yet).

Its worth noting that there are a handful of ways to import, as we will definitely
use some of them:

```JavaScript  
// This imports the `default export` from a module.
// There can be only one default.
import React from 'react';
// You can import several named exports with this syntax:
// It is like the destructuring assignment that you can use
// with arrays and objects as well:
import { foo, bar } from 'baz';
// and if you want to rename an import, you can:
import { foo as bar } from 'baz';
// However, you can also import all of the exports
// of a module:
import * from 'react';
// and there are a number of gnarly other ways to do this,
// but this should get you plenty far.
```

### Import CSS?

This isn't the scary "CSS in JS" or any of the other gnarly things you may have
heard about in the land of React.  This is simply ensuring that you know exactly what
CSS is used to style a component.  Using `import './file.css'` ensures that as you
maintain your components, you are much more likely to maintain associated CSS.

We may give CSS in JS and/or CSS modules a spin in a later lesson.

### App.js

So it appears that index.js does just one thing:

```JavaScript
ReactDOM.render(
  <App />,                        // it renders this component
  document.getElementById('root') // into this DOM node
);
```

So the next clue we need to track down whats going on must be in `App.js`.  Lets
crack that open.

Here, were are going to get into a JavaScript class:

```JavaScript
class App extends Component {

}
```
Notice the import:

```JavaScript
import React, { Component } from 'react';  // what is this?
```
This import statement is importing two things.  The syntax is strange, so lets
look at it another way:

```JavaScript
import React from 'react';

// aha! So Component is a property of React?  Yup.
class App extends React.Component {

}
```

We are just using the destructure syntax to specifically pluck out `Component`
from `React` and use it.  This is syntax preference, only.  Remember from our
earlier lessons, everything is an object.  `React` is an object.  The `Component`
property of that object is a `Class`, that we `extend` to create our own classes.

Generally speaking, we will always `extend` the class `Component`.  It is fairly
uncommon to have a large class inheritance tree (There is a phrase, `Favor composition
over inheritance`).

So the `App` class has one method:

```JavaScript
class App extends Component {
  render() {
    // returns some HTML.
  }
}
```
And inside this method we see JSX.  JSX is just a convenience way to keep our HTML
near our JavaScript.  

Do we need it?  Nope.  What if we don't want to use it?

Lets give it a spin:


```JavaScript
// cuz we don't want to type so much
const element = React.createElement;

class MyComponent extends Component {
  render () {
    // React.createElement accepts 3 things:
    // a string name of the node to create
    // the props (or null),
    // and the element's children
    //
    // simple:
    // return element('div', null, 'This is text in the div.');
    //
    // slightly less simple:
    // return element('div', null, element('p', null, 'This is text in the p'));
    //
    // more complex:
    return element('div', null,
      element('h1', null, 'Contacts', // this node just has a text child: <h1>Contacts</h1>
        element('ul', null,
          element('li', null,
            element('a', { href: 'mailto: bpetersen@redhat.com' }, 'Ben Petersen')
          ),
          element('li', null,
            element('a', { href: 'mailto: janedoe@gmail.com' }, 'Jane Doe')
          )
        )
      )
    );
  }
}
// hmm.  that kind of sucks.  Maybe doable, but prob not so fun.
```

So if we instead do our component with JSX:

```JavaScript
class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>Contacts</h1>
        <ul>
          <li><a href="mailto:bpetersen@redhat.com">Ben Petersen</a></li>
          <li><a href="mailto:janedoen@gmail.com">Jane Doe</a></li>
        </ul>
      </div>
    )
  }
}
//  mmmm... yeah, thats a lot less sucky.
```

And we can actually reduce this further, if we want to:

```JavaScript
const MyComponent = () => {
  return <div>Hi, mom.</div>
}
// so we can just use a function, if we want?  Yups. React will
// take its return value as render.
```

The last thing we will do this week is rename our component (if we are
going to keep it).  The above `non-jsx` component can be named `NonJSX`:

```JavaScript
// old:
// class MyComponent extends Component { }
// new:
class NonJSX extends Component { }
```

And be sure to update your `App.js` file to fix the imports!

Next week, we will get into the basics of a Todo list & compare to our
Angular version from `projects/gulp-angularJS`.
