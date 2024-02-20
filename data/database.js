import mongoose from "mongoose";

//so to connect to the database what will be doing 
export const connectDB =()=>{
                    //AB KYA HOGA KI mai ese process.env.MONGO_URI ESKE KRKE INKI VALUE ACCESS KR SAKTA HU
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"backendapi",
    })
    .then((c)=>console.log("Database connected"))
    .catch((e)=>console.log(e));

}