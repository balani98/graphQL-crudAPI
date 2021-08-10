const 
{   GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString, 
    GraphQLInt
     } = require('graphql')

const websiteType = new GraphQLObjectType({
    name:'website',
    description: 'This represents the website made by the Owner(Programmer)',
    fields:()=>({
        id:{ type : GraphQLNonNull(GraphQLInt)  },
        name : {type :GraphQLNonNull(GraphQLString) },
        ownerId : { type :GraphQLNonNull(GraphQLInt)} 
    })
})

module.exports = websiteType