import { app } from "./app.js";
//so hmmari main file ab server hai na ki app , or jitne bhi middleware use krenge vo krenge hm app ke andar , or jo database connect krengee vo krengee server ke andar 
import { connectDB } from "./data/database.js";
// call database
connectDB();    //still the same working bs ek keyword hai abb
// console.log(process.env.PORT);

//but agr deploy krne ke baad hmme koi bhi api key badalni hai , ya kuch badalna ho to hm sidhaa env file mai badal sakte hai 
app.listen(process.env.PORT, () =>{
    console.log(`server is working on port: ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);

}) 