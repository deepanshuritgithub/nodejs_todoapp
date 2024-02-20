//hm yhape apni error class bnayengee ye to es error ke andar hi bna sakta hai vo class ya ir utils ke andar apni koi class bana sakte hi, mtlb ki jo code yha likh rha ho utils ke andar likh sakta ho 
class ErrorHandler extends Error {//esko extend krengee jo apni asli error class hai ussme  se 
    constructor(message , statusCode) {//esme hme 2 chiz chahiye ek to message or status code , 
        //message aate hi hm kya krenge super ko call krenge , or super mai pass krengee message 
    super(message);//super basically parent class ke constructor ko bolte sakte hai   , so ye jo super mai message diya hai ye eske andar puch jayegaa Error wali  class ke andar 
    this.statusCode = statusCode; //status code ko hm ese mai save kr lengee 
    }
  }


export const errorMiddleware = (err,req,res,next)=>{//hm simple arrow function bna dengee, but isko kese pta lagaega ki ye error handler middleware hai  
    //so weird behaviour nhi chaiye es liye hm kya khe dengee ,ki agr err.message ki value ho err.message ya fir "Internal server error "
    err.message = err.message ||"Internal server error ";//so agr error ka message exist krta hai to vo hogaa otherwise ye hogaa Internal server error      

    err.statusCode = err.statusCode || 500;//status code 500 is the internal server error ka 



    // console.log(err.message);//so hmm err.message se error ka actual message access kr sakta hai 
    return res.status(err.statusCode).json({//YHA PE ek chiz or ki hmesa status code yhi arra , ab jruri thdi ki mujhe yhi error throw krna ho 
        success: false,
        message: err.message,
      });
}



export default ErrorHandler;