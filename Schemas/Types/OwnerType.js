const 
{   GraphQLObjectType, 
    GraphQLNonNull, 
    GraphQLString, 
    GraphQLInt } = require('graphql')

const ownerType = new GraphQLObjectType({
    name:'owner',
    description: 'This represents the Owner',
    fields:()=>({
        id:{ type : GraphQLNonNull(GraphQLInt)  },
        name : {type :GraphQLNonNull(GraphQLString) }
        
    })
})


module.exports = ownerType