# server - Node.js Technical Test
Build a node server which:

* Serves up the SPA
* Server renders the SPA to support non-JS clients
* Saves user inputed data to the server as they switch between form fields
* Saves completed form data on user submission
* On page reload, populates the form fields with the values previous saved
* Is stateless, to support auto-scaling

`get /`: return SPA as html\
`get /:userId`: return user data as JSON\
`post /update`: store input data to session\
`post /submit`: store complete form data to db (JSON file based storage)

## Environment
* node v16.13.2
* yarn v1.22.17
* macOS Monterey v12.1

## Instruction
### `yarn`
install dependencies

### `yarn test`
run tests

### `yarn start`
start server\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Time

A total of 3 hours spent on this project\
around 1.5 hours on requirements analysis and investigation into server side rendering\
around 1.5 hours on coding and testing