// A component without JSX!
import React, { Component } from 'react';

const elem = React.createElement;

class NonJSX extends Component {
  render() {
    // <div class="container">
    //   <h1>Foo!</h1>
    //   <h2>Bar</h2>
    //   <ul>
    //      <li>
    //         <a href="#">Click Me!</a>
    //      </li>
    //      <li>
    //         <a href="#">Click Me!</a>
    //      </li>
    //   </ul>
    // </div>
    return (
      elem('div', null,
        elem('h1', null, 'Non JSX!'),
        elem('h2', null, 'manually make elements'),
        elem('ul', null,
          elem('li', null,
            elem('a', {href: '#'}, 'Click me! '),
            elem('a', {href: '#'}, 'Click me! '),
          )
        )
      )
    );
  }
}

export default NonJSX;
