const {mongoose} = require('../db/mongoose-connect')

var schema =  new mongoose.Schema({
    id:{
        type: String
    },
    token:{
        type: String
    },
    name:{
        type: String
    },
    email:{
        type: String
    }
});

var GoogleData = mongoose.model('googleData',schema)

module.exports={
    GoogleData
}