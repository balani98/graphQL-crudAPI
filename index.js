const express = require('express')
const app = express()
const PORT = 5000
//graphQLHTTP is a method which will work with express server
const {graphqlHTTP}  = require('express-graphql')
const db = require('./database/config')
const schema = require('./schemas/index.js')





   

app.use('/graphql',graphqlHTTP({
    graphiql:true,
    schema:schema
}))
app.listen(PORT, ()=>{
    console.log(`server is listening on Port ${PORT}`)
})