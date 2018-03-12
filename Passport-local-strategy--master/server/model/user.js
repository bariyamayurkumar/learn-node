const {mongoose} = require('../db/mongoose-connect')
const validator = require('validator')
const schema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:8
    },
    age:{
        type: Number,
        required: true
    },
    mobile:{
      type: String,
      required: true,
      maxLength: 10
    },
    username:{
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "{value} is not valid"
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    }
})

var User = mongoose.model('user',schema)

module.exports={
    User
}

