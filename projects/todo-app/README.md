# express 4 API:
- http:expressjs.com/en/api.html

# express getting started/generator
- https:expressjs.com/en/starter/generator.html

# serve the app:
- `npm start`
- where "start" is defined in the package.json file
  and takes care of getting the express app up and running
<!--
- `npm run dev`
- where "dev" is defined in the package.json file
  and takes care of watching local files for changes so you
  don't have to manually restart the server.
-->

# change the port?
- `PORT=3001 npm start`
- set the env vars first, these will be used by npm

# now, to build an API
- https:scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
- https:gist.github.com/iksose/9401758
- https:devcenter.heroku.com/articles/mean-apps-restful-api

# Simple API via json-servier
  `npm install json-server`
  then, create `mock_data/db.json` with some dummy data.
  then
  `$ json-server --watch mock_data/db.json`
  can alt the port with: `--port 3001`
