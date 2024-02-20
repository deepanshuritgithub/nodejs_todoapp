import mongoose from "mongoose";
//so let's create our schemaa 
const messageSchema = new mongoose.Schema({
    //hmm yha pe schema define kr sakta hai yha pe agr hm form mai jaate hai 
    name:  {
        type: String,
        required:true, 
    }, 
    email: {
        type: String,
        required:true,
        unique:true   
    },
    password: {
        type:String, 
        required:true,
        select:false
    },
    createdAt: {//so es se hmme pta chl jayegaa ki create kb hua user 
        type:Date,
        required:true,
        default:Date.now()
    }   
})
//ye 3 chize mongoose ke schema mai hongii 
export const User = mongoose.model("User",messageSchema)//model ka naam hm kuch bhi de sakte ha hm denge User 



//ye User ka hogya schemaa 