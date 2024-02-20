import { User } from "../models/user.js";//make sure to .js rkhoo 
import  jwt  from "jsonwebtoken";

//arrow function bnayenmge yhaa isAuthenticated jisme ye 3no hongee req, res, next  , esko hm route mai jayengee or jha jhaa hmme chiye mandatory login hona chahiye vha  pe add kr dengee , conver it into async function , only write some text like async before callback 
export const isAuthenticated = async(req,res, next) => {
    const { token } = req.cookies;
 
  if (!token) { //agr token nhi hua to mai khe dungaa login first 
    return res.status(404).json({//status 404 means http not found 
      success: false,
      message :"Login First",
    })
  }

  // //agr token hai to mai es token mai se hi information le sakta hu saari  jaise ki decoded data
   const decoded = jwt.verify(token, process.env.JWT_SECRET)//so es se merko decoded data mila , so ussme se hm access kr lengee apni id koo 

   req.user  = await User.findById(decoded._id);//mai yha pe apni id pass krke , response mai apna information bhej skta hu , mai ese minformation bhjj sakta hu lekin id kha se aayegii 
//so ab user mil gyaa , so ab hm user ko kya krenge ki ,req.user ke andar save kr lengee , so ye jo callback ke andar hmara req object uska andar hmara req.user availabale hogaa login krne ke baad 
next();


    //so eske andar jab next call hogaa , tab jaake ye execute hogaa  getMyprofile maii login mandatory wala system,  next call hm krengee jb login hogaa rightt     

}