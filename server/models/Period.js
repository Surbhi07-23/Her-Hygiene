const mongoose = require("mongoose");

const periodSchema = new mongoose.Schema({
    userId : {                                                //links period to a user
        type : mongoose.Schema.Types.ObjectId,                //MOngoDB ID
        ref : "User",                                         //references User model .. just like foreign key ..will use _id from User model
        required : true                                       //userId must exist
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required :true
    },
    flow : {
        type : String ,
        enum : ["light" , "medium" , "heavy"],
        default : "medium"
    } ,
    symptoms : {
        type : [String],                                      //symptoms = ["cramps", "bloating", "headache"]   list of strings
        default : [ ]
    },
    notes : {
        type : String ,
        default : ""                                         //notes = "Heavy flow on day 2"   only one value
    }
},
    {timestamps : true}
);

module.exports = mongoose.model("Period" , periodSchema);     //creates model "Period" and collection becomes "periods"