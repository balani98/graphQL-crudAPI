const model = require('../models')

const 
{   GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString, 
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
     } = require('graphql')
const websiteType = require('./Types/WebsiteType.js')
const ownerType =  require('./Types/OwnerType.js')

const RootQueryType = new GraphQLObjectType({
    name:'Query',
    description:'Root Query',
    fields:() => ({
        websites:{
            type:new GraphQLList(websiteType),
            description:'list of all websites',
            resolve : () => model.website.getAll()
        },
        owners:{
            type:new GraphQLList(ownerType),
            description:'list of all owners',
            resolve : () => model.owner.getAll()
        },
        website:{
            type:websiteType,
            description:'A single website type',
            args:{
                id:{type:GraphQLInt}
            },
            resolve :(parent,args) => model.website.index({id : args.id})
        },
        owner:{
            type:ownerType,
            description:'A single Owner Type',
            args:{
                id:{type:GraphQLInt}
            },
            resolve :(parent,args) => model.owner.index({id : args.id})
        }
    })
})  
const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addWebsite: {
        type: websiteType,
        description: 'Add a website',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          ownerId: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve: async (parent, args) => {
          const website = { id: await model.website.count() + 1, name: args.name,ownerId:args.ownerId }
          console.log(website)
          await model.website.add(website)
          return website
        }
      },
      removeWebsite: {
          type: websiteType,
          description: 'Remove a Website',
          args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
          },
          resolve: async(parent, args) => {
               await model.website.remove({id:args.id})
               //return "deleted"
            }
        },
      addOwner: {
        type: ownerType,
        description: 'Add an Owner',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: async(parent, args) => {
          const ownerObj = { id: await model.owner.count() +1, name: args.name }
          await model.owner.add(ownerObj)
          return ownerObj;
        }
      },
      removeOwner: {
          type: ownerType,
          description: 'Remove an Owner',
          args: {
            id: { type: new GraphQLNonNull(GraphQLInt) }
          },
          resolve: async(parent, args) => {
               await model.owner.remove({id: args.id})
               return await model.owner.index({id:args.id-1})
             }
        },
        updateOwner: {
          type: ownerType,
          description: 'Update an Owner',
          args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name:{type:new GraphQLNonNull(GraphQLString)}
          },
          resolve: async (parent, args) => {
            const ownerObj = {
              id:args.id,
              name:args.name
            }
              await model.owner.updateOne({id:args.id},ownerObj)
              return ownerObj
          }
        },
        updateWebsite: {
          type: websiteType,
          description: 'Update a Website',
          args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name:{type:new GraphQLNonNull(GraphQLString)},
            ownerId:{type:new GraphQLNonNull(GraphQLInt)}
          },
          resolve: async(parent, args) => {

            const websiteObj   = {
                                   id:args.id,
                                  name : args.name,
                                  ownerId: args.ownerId
                                 }
             await model.website.updateOne({id:args.id},websiteObj)
            
            return websiteObj
          }
        },
    })
  })

const schema = new GraphQLSchema({
    query:RootQueryType,
    mutation:RootMutationType
})

module.exports = schema