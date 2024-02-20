import mongoose from "mongoose";
//so let's create our schemaa 
const messageSchema = new mongoose.Schema({
    //hmm yha pe schema define kr sakta hai yha pe agr hm form mai jaate hai 
    title: {
        type: String,
        required:true,
    } ,
    description: {
        type: String,
        required:true,  
    } ,
    //is completed nhi chahiye starting mai , jab hm taskk create krengee , by default vo false hi rhene wala hai  , so basically is complete is like ek checkbox hogaa 
    isCompleted: {//is basically a checkbox
        type:Boolean, 
        default:false,
    },
    user: {
        //esme basically user ki id hogi jisne bhi task create kiya , paricular task
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User",//ab yha pe hmme refernce dena hai jo ye id hogi kiski id hogi , ye hogi user ki , make sure jo hmme refernce dena hai vo hona chiye collection ka reference , jo hmme yha diya hai shi diya hai kyuki jo collection hai uska naam user hai 
        required:true,
    },
    createdAt: {//so es se hmme pta chl jayegaa ki create kb hua user 
        type:Date,
        default:Date.now()
    }   
})
//ye 3 chize mongoose ke schema mai hongii 
export const Task = mongoose.model("Task",messageSchema)//model ka naam hm kuch bhi de sakte ha hm denge User 



//ye User ka hogya schemaa 