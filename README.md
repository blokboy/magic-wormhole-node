# NodeTemplate
a template repo for my typical Node setup

## Getting started

### Local Development

1. run `npm install` after downloading and navigating to the root directory
2. run `knex migrate:make latest` from root directory to create the database and connection
3. run `knex seed:run` to populate the database with initial user data
4. run `npm run-script dev` to start the server for local development 
   * If this step succeeds, you should see a console log on your output specifying the port being listened on
   
5. Use curl or Postman (can't use Postwoman for local development afaik :( ) to make requests to the api at the specified port number
