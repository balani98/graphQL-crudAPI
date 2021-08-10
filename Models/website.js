const schema = require('../MongoSchemas')
const mongoose = require('mongoose')


class Website{
   constructor(){
       this.model = mongoose.model("website",schema.websiteSchema)
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

        return await this.model.remove(criteria)
   }
   async add(websiteObj){
       return await this.model.create(websiteObj)
   }
   async count(){
       return await this.model.estimatedDocumentCount()
   }




}
module.exports =  new Website()