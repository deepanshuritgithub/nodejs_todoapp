//so task controller banana se phle obviously hmme routes banana hai

import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try{

 
  //so hm jab bhi task crteate krenge to form mai data hogaa , title ,description ka jo ki frontend se milegaa right  , so title description to hm body mai se le lengee so
  const { title, description } = req.body; // ab ap  cho to yha pe condition add kr sakte hoo , ki title nhi ho , ya description nhi ho , to hm phle hi return krde ki ye dono chize mandatory hai rightt

  //so ab user kaha se aayegaa
  //so ye or create method same hi hai basically
  //another way to doo , sp upar se task import hua hai , agr mai yha kr doo
  // const task = new Task({title, description})//or esme data vese hi dedoo jo bhi haii , uske baad task.save esko call kr do await lagake
  // await task.save();

  // preferrable
  await Task.create({
    //es method ko call krengee while passing the data jo bhi hamra data hai
    title,
    description,
    user: req.user, //uske ke andar hmme user information chahiyee vo kha se aayegii , vo hm access krengee req.user mai se, req,user mai se kha see aayii, kyuki abhi hm make sure krengee task vhi add kr payee jo logged in user hai  , uske liyue hmme krna haii isAuthenticated ko addd
  });
  //SO ESE krke hmne tash create kr diaa , or ab hm ese bhj dengee
  res.status(201).json({
    //201 -> created and json data in the endd
    success: true,
    message: "Task added Successfully",
  });
}
catch(error) {
  next(error);//catch mai kuch nhi bs simply next ko call krengee or error hmme mil hi rha hai upar se pass kr do as it is 
}
};

//so b jo functionbanana hai uska naam rkhte hai getMyTask
export const getMyTask = async (req, res, next) => {
  try{
  //so hmee kya krna hai ki database mai se , ye saare task jitne bhi hai created sarre dene hai  , sirf vo ho ki , jisme ki user id vo ho jis user ne login kiya hua hai

  //so login user kese milegaa hmme , obvious se batt hai req.user se hmme user information mil jayegii ._id lagake id mil jayegii , so usko save kr lete hai userid naam n=ke variable mai  jisme ki user ki id hai , hmme saare vo dhundne hai jha oe ki id match ho jaye
  const userid = req.user._id;
  //so ab hmme saare vo dhundne hai ki jahapoe ki user ki jo id hai user id se match ho
  const tasks = await Task.find({ user: userid }); //esme hmme sarre task mil jayeenge jisme ki user ki id match hogii
  //find method obviously error return krta hai , puri error mil jayegi , vo in the end vo hm usko return kr dengee
  res.status(200).json({
    success: true,
    tasks,
  });
}
catch(error){
  next(error);
}
};

export const updateTask = async (req, res, next) => {
  try{

    // const id= req.params.id;
    // app esko is trah se bhi likh saktw ho destructure krte hua , ese jyada preferrable hai const {id}= req.params;
    // console.log(id);
    
  const task = await Task.findById(req.params.id);
  
  // if (!task)
  //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid Id",
    //   });
    
    if (!task)
    return next(new ErrorHandler("Task not found",404))
  
  //so ab kya krengee ki jo bhi task ke andar , task dot krungaa to hmare pass hoga isCompleted ye boolena hai eski value kr denge iska opposite
  task.isCompleted = !task.isCompleted; //so es kya hogaa true hoga to false ho jayegaa , or viceversa
  //and yaha pe await krne ki jrurat nhi hai hmmne yaha pe koi promise return nhi kiyaa , ye to hmmne normal eski value change ki hai , or save niche hogaa
  
  await task.save(); //make sure to save this task , or jab save kr rha hai to yha hoga promise return , so make sure ki await add kr do yha pe
  
  res.status(200).json({
    success: true,
    message: "Task Updated!",
  });
}
catch(error){
  next(error);
}
};

export const deleteTask = async (req, res, next) => {
  try{

    const task = await Task.findById(req.params.id);
    // next()//so jab jab mai ese call krungaa es se agla wla jo handler hai vo execute ho jayegaa , ye eska weird behavious hai ki ye error mangega , nhi manga rha hai to mtlb esko pta hi nhi hai ki ye iska function hai
    
    //so sakta hai jab maine isko id pass kre to iska task mila hi na ho , uss case mai ye task jo hai undefined rhegaa , obviously ye kha se remove ho sakta hai
    if (!task)
    return next(new ErrorHandler("Task not found",404))//eske andar bs hmme error throw krna hai , error hmaare pass class hai esko call krengee 
  await task.deleteOne();
  
  res.status(200).json({
    success: true,
    message: "Task Deleted!",
  });
}
catch(error){
  next(error);
}
};

//express hi hmme error ka middleware provide krta hai , ye jo next hai , next ko agr mai call krta hu
