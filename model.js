const mongoose = require('mongoose');
const { setThePassword } = require('whatwg-url');

const userSchema=new mongoose.Schema({
    user_id:{
        type: Number
    },
    username:{
        type : String
    },
    email:{
        type : String
    },
    password :{
        type: String
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'pending' 
    },
    create_time:{
        type : Date
    }
})
const departmentSchema=new mongoose.Schema({
    dep_id:{
        type: Number
    },
    name:{
        type:String
    },
    number_of_students:{
        type:Number
    },
    highest_package :{
        type : Number
    },
    description :{
        type :String
    }
})

const eventSchema=new mongoose.Schema({
    event_id:{
        type:Number
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    date_time:{
        type: Date
    },
    location:{
        type:String
    },
    dep_id:{
        type:Number
    },
    created_admin_id:{
        type:Number
    }
})

const registerSchema=new mongoose.Schema({
    register_id:{
        type: Number
    },
    user_id:{
        type: Number
    },
    event_id:{
        type:Number
    },
    register_time :{
        type : Date
    },
    status :{
        type: String,
        enum: ['applied', 'cancelled'],
        default: 'pending' 
    }
})
const User=mongoose.model('userdetails',userSchema)

const Department=mongoose.model('deptdetails',departmentSchema)

const Event=mongoose.model('eventdetails',eventSchema)

const Register=mongoose.model('registerdetails',registerSchema)

module.exports={User,Department,Event,Register};
