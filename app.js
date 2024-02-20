import express from "express";
//            import mongoose from "mongoose";//ab hmme esko bhi jrurat nhi kyuki hmnne eske liye dataase mai dall diya hai code 
export const app = express();
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
//call config
config({//ab yha pe option pass krna hai , option yha pe object hogaa 
    path:"./data/config.env",
})


//hmne last time jab form mai data accept kiya thaa , uss wala mai hmmne ek middleware use kiya thaa ,use ke andar url encoded , so vo tha form data access krne ke liye, so abjson data bhj rahe hai body mai,uske liye hmme ek chiz krni padegii 
app.use(express.json());//using middleware for serving jaon data        

//make sure ye jo hmme express.json use kiya hai    , ye hmme phle use krna hai router use krne ke otherwise ye agr hmmne baad mai use kiya hai jis time pe hm jo bhi route access kr rha hai , controller access kr rha honge , uss time tak to ye use nhi hua to ye dikkat degaa , make sure ye phle use hua ho 

app.use(cookieParser());
app.use(cors({
    //so hm yha pe domain spoecify kr sakta hai , origin specify kr skta hai , jo jo allowed hai that could be array 
    origin:[process.env.FRONTEND_URL],//so what i prefer to do yha pe statically likhne ki bjaye process.env.FRONTEND_URL , Eske BAAD OR DENA HO TO FRONTEND URL 2 DE SKATA HO, so ITS UP TO YOU
    //eske baad hm methods likh sakte hai its up to u 
    methods:["GET","POST","PUT","DELETE"], //THESE ARE request , ye saare methods allow hai 
    //eske baad ek or chiz hai make sure to set this to truue
    credentials: true,
    //ab mann l;o main ese off rkhta hu to hoga kyaa , hoga ye ki api's to kaam kregii, frontend pe creatials nhi phuchengee , mtlb ki jo bhi headers hai , jo bhi message bhjna chah rha hai headers mai kuch nhi phuchegaa , cookies wagera kuch nhi phuchegi es lia mai yha pe true rkhungaa , jais ehmne kya kiya tha ki login krte hua cookie set ki hai so frontend pe credentials nhi puchengee agrr nhi rkhoge to credentials ko, jo bhhi hmm bhjna chah rha hai kuch nhi phuchnegaa , cookies wagera kuch nhi phuchnegii es liye hme credentials true rkhna  hai , or frontend mai wih credentials vha true krna hai 

}));//ab hmme simply app.use mai cors ko dalna hai , esme hm otions bhi pass kr sakta hai , options agr pass krne ho to object aayega options ka , options mai hm bta skta hai ki kon konsse method allow hai, or domain hm provide kr sakta hai for example hmne ke website bnay todoapp.com , uska domain hmne yha pass kr diaa to kya hogaa ki todoap.com  wali website se jo bhi request aayegi to ye allow kr degaa otherwise koi random domain se request krega to vo saari block ho jayegi right 

// const router = express.Router();
// //ab hmm esme bhi kr payenge router mai jaise hm esme kr paa rha hai app.get , app.post , ab hm same usme bhi kr payengee as it is router.get or router .post asically our's crud operations 
//using routes 
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middleware/error.js";

// import { connectDB } from "./data/database.js";
// // call database
// connectDB();    //still the same working bs ek keyword hai abb
//abhi bhi hmne esko khi use nhi kiyaa to esko use kese krenge , so jo bhi hmme app mai use krna hogaa , vo hmm app.use ke andar likh dengee 
app.use("/api/v1/users",userRouter);//yha pe mai ek custom url bna leta hu ye to hone hi chahiyee , so es se kya hua ki jitne bhi users route ke andar hoongee , usme /users phle se hi add hai    
// /api/v1 ye use kr rha hai sirf btana ke liye ki hm api use kr rha hai , ye genearally term use hoti hai 
app.use("/api/v1/task", taskRouter);
// const User = require("../models/user-model")


// //so to connect to the database what will be doing 
// mongoose.connect("mongodb://localhost:27017",{
//     dbName:"backendapi",
// })
// .then((c)=>console.log("Database connected"))
// .catch((e)=>console.log(e));
//so ye krne se hmm database se conneect ho gye hai ab hmm apne databae mai data aaddd kr sakta hai , so sabase phlle hmme schema create krna padta hai , basicall hmme pre-define krna padta hai kya kya aana wala hai uss document ke andar 

// //so let's create our schemaa 
// const messageSchema = new mongoose.Schema({
//     //hmm yha pe schema define kr sakta hai yha pe agr hm form mai jaate hai 
//     name: String,
//     email: String,
//     password:String,
// })
// //ye 3 chize mongoose ke schema mai hongii 
// const User = mongoose.model("User",messageSchema)//model ka naam hm kuch bhi de sakte ha hm denge User 


app.get("/", (req,res)=>{
    res.send("Nice working")
})



//ye hmne bna liya esaa apna error middleware pr ye yha pe rkha hua acha nhi lag raha hai so kept in our error .js of the middleware    
//using error middleware //so this is our error handler 
app.use(errorMiddleware);


//so es se kya hogaa saare users get ho jayegii 
// app.get("/users/all", async(req, res)=>{
// //hmarc apss kuch methods hote hai find by id , find , ese hi hmmre pass method hahi find jo ki saare  database mai se find kr degaa user , promise return kregaa , but  we will  async and await 
//     // User.find({name:"Abhi"})
//     const users = await User.find({})
//     // console.log(req.query);
//     //mai 3no ko access bhi kr sakta hu , ab jaise merko chahiye hota keyword ,  mannlo ki mujhe variable bnana hota keyword , to agr mai esme req.query.keyword krungaa to deepanshu ki value mil jayegi
//     //so question mark ke baad jo kuch bhi likhte hai vo queries hoti hai , params is a apart of query
//     const keyword = req.query.keyword;
//     console.log(keyword);

//     res.json({
//         success:true,
//         // users:[],
//         // users:users,
//         users,//agr key or value same hai to ese hi pass kr doo 
//     })
// })




//supose jaise hmme users create hi krna ho , so jaise hmne post request bnayi thi 

// app.post("/users/new", async(req, res)=>{//ab ye URL gar access bhi kru browser mai , to output jo aayegaa cannot get users /new aayegaa kyuki browser se hm get request access kr sakta hai
    
//     //hmme static data nhi chahiye , hmme chiye actual data to vo kese aayegaa 
//     const {name, email, password }= req.body;//ye 3no chize hmm bhej dengee as it is , name mai name , email mai aemail , passsword mai password , agr key r value pair same hai to hmm ek hi baar decalre kr sakta hai

//     // User.find({name:"Abhi"})
//      await User.create({  //yha pe ese variable ai declare krna ki jrurat nhi hai sidha await lagana hai 
//         // name:"Deepanhshu",  
//         // email:"kukrejagolu8@gmail.com",
//         // password:"djkand",
//         name,
//         email,
//         password,
//     })

//     res.status(201).cookie("tempi", "lol").json({  //status 201 ka mtlb hai created 
//         success:true,
//         // users:[],
//         // users:users,
//         message:"Reistered Successfully",//yha pe hmm message de skte hai 
//     })
// })



// //ab yha pe dikat kya aa sakti hai maan lo mujhe ek specific URL bannana hoo 

// app.get("/userid/special", async(req,res)=>{
//     res.json({
//         success:true,
//         message:"Just Joking",
//     })
// })


//ab es url mai or niche wala  url mai kya frak hai , technically dono hi same hai,  esme special ko id consider krna chahiyee  right??..  

//jab hmm esko upar wala ko run kr rha hai to ye kyu aaya niche wala kyu nhi aaya ,esaa kuu 
// kyuki js mai , ya fir express mai to be more precise     ,, kya hua ki jab ya wala url access kiya too , ye wala route phle hi fit ho gyaa to niche usne execute hi nhi kiyaa , agr mai esko niche rkhta special wala ko to vo phle run hota jo upar hai         


//userid/asdasd
//userid/abhishek


// //dynamic routing , jaise ki maano lo ki mujhe api bnani haii 
// app.get("/userid/:id", async(req,res)=>{
//     // const id= req.body.id;
//     const {id}=req.params;//ya fir ese destructue kr do dono same hi hai 
//     const user= await User.findById(id);//find by id ek method hai esme hmme id pass krni hai , ya to mai kyaa kruu , ya to mai id access kr loo uper aese 
//     // console.log(req.params);
//     res.json({
//         success:true,
//         user,

//     });
// }); 


// app.listen(4000, () =>{
//     console.log("listening to the port no 4000");

// }) 


//suna hoga async await jo jabbhi use kro try catch block ke andar wrap hona chahiye voo 