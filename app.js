const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

// call express as a function to create app
const app = express()

// add bodyParser middleware to parse incoming JSON bodies
app.use(bodyParser.json())

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type RootQuery {
      events: [String!]
    }

    type RootMutation {
      createEvent(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return ['Romantic Cooking', 'Sailing', 'All-Night Coding']
    },
    createEvent: (args) => {
      const eventName = args.name
      return eventName
    }
  },
  graphiql: true
}))

// listen on port 3000
app.listen(3000)
