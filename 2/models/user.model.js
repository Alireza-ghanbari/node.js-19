import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:[true,'fullName is required'],
        minLength:3,
        maxLength:50,
        trim:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        match:[/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,'email invalid'],
        unique:[true,'email is already  taken']
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    phone:{
        type: Number,
        required:[true,'phone number is required'],
        unique:[true,'this phone already in use'],
        max: 9999999999
        // validate:{ validdator: function(value){
        //     return this.phone < 9999999999 && this.phone > 1000000000
        // }}
    },
    address:{
        type:String,
        default: "",
        maxLength: [200, 'address is too long']
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User