const schema = require('../MongoSchemas')
const mongoose = require('mongoose')


class Owner{
   constructor(){
       this.model = mongoose.model("owner",schema.ownerschema)
   }
   async getAll(criteria={}){
       return await this.model.find(criteria);
   }
   async index(criteria={}){
       return await this.model.findOne(criteria)
   }
   async updateOne(criteria={},updatedObj){
       return await this.model.updateOne(criteria,updatedObj)
   }
   async remove(criteria = {}){

        return await this.model.deleteOne(criteria)
   }
   async count(){
       return await this.model.estimatedDocumentCount()
   }
   async add(ownerObj){
    return await this.model.create(ownerObj)
}




}
module.exports =  new Owner()