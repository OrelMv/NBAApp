const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const GraphQLSchema = require('./GraphQL-Schema/Schema')

const app = express()

require('./configs/dbConnection')

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: true
}))

app.listen(8000, () => {
    console.log("Server Is Running")
})