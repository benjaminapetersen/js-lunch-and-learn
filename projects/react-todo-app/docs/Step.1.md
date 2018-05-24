# React Todo App

We are leaving our previous simple todo app as it is for reference and 
moving on to a complex todo app.  Our app will be modelled after existing 
complex todo apps like [Remember The Milk](https://www.rememberthemilk.com/app/#all) and will take a structure 
similar to the following:

```bash 
# TODO LIST APP 
# ===========================================
# [] list 1                     | lists (filter)
#    [] item 1 <due>            |  - list 1 (12 items)
#    [] item 2 <due>            |  - list 2 (15 items)
#    [] item 3 <due>            |
#      optional description     |  
#    - complete -               | Status (filter)
#    [x] item 4 (done)          |  - incomplete (12 items)
#                               |  - complete (6 items)
# [] list 1                     |  - overdue (8 items)
#    [] item 1 <due>            | 
#    [] item 2 <due>            | Tags (filter)
#    [] item 3 <due>            |  - home
#                               |  - work
#                               |  - foo
#                               |  - bar      
```

We are going to implement the following:

- Multiple TODO lists with the ability to create new lists
- TODOs with optional descriptions, deadlines, status, tags 
- Filtering 
  - by status (complete, incomplete)
  - by tag (random tags)
  - by list name 

This should give us enough complexity to need to reach for a tool 
like `Redux` or `Flux` to keep our business logic reasonable.


## Getting Started 

Execute the following commands:

```bash 
# optionally you can fork & pull the latest from 
# github.com/benjamianpetersen/lunch-and-learn-js, then 
# cd into projects/react-todo-app
cd path/to/your/projects/folder 
npx create-react-app react-todo-app

# you should have a .gitignore generated, but if you do not, 
# be sure to add one and at least add the /node_modules directory 
# to it.
touch .gitignore
```

Then, we are going to `cd` into `src` and do a little rearranging up front.
We want the app to have a similar structure as last time:

```bash 
/src
  |_ /components 
      |_ /app 
         |_ App.js
         |_ App.css
         |_ App.test.js                   
```

Optionally, you can continue to use `index.js` if you prefer that method.  

NOTE: make sure to update your `import` statements or your app is going 
to explode!  

Now, start up the app:

```bash 
yarn start
```

Lets add `hot module reloading` and restart our app, that was handy:

```JavaScript 
// src/index.js

if (module.hot) {
  module.hot.accept();
}

```

Now, lets update `/src/components/app/App.js` render with a template for our 
TODO app.  You can use what I have provided, or create your own markup. 

Install your preferred CSS library, Boostrap, Bulma, whatever:

```bash 
yarn add bootstrap||foundation||bulma||you-made-your-own-thing
```

