const mongoose = require("mongoose");
const url =
  "mongodb://localhost:27017/mydb";
mongoose.Promise = global.Promise;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    keepAlive: 1,
    useUnifiedTopology: true
  })
  .then(res => {
      console.log("Connected to MongoDb Server")
  })
  .catch(error => {
    console.error(error.message);
  });
module.exports = mongoose;