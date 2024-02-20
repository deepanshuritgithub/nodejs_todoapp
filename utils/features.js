import jwt from "jsonwebtoken";


//ab mujhe user chahiye or res chahiye  
export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  ////2nd chiz jo hmme esme bhjni hai vo ye hai token generate krna hai , token ki value hm bhj dengee token mai , ab yha pe hmm options pass kr sakte hai bhut saare
  res
    .status(statusCode)
    .cookie("token", token, {
      //one more data i want to pass here which is optional
      httpOnly: true,
      maxAge: 30 * 60 * 1000, //15 minutes
      // HttpOnly is an additional flag included in a Set-Cookie HTTP response header. Using the HttpOnly flag when generating a cookie helps mitigate the risk of client side script accessing the protected cookie (if the browser supports it).
      //ab kuch or parameters bhi hai cookies ke andar jaise ki same side , same side ka funda kya hai ki vo by default  ek to vo strict hai , strict nhi lax hai , it has 3 properties lax, none ,strict , by default lax hi hai 
      // /abhi hmme kyaa krna hai ki hmme same site ko krna hai none  , to hmmara forntend koi url pe rhegaa orr backenmd koi or url pe //abhi hmme same site ko none krna hai deploy krte waqt
      sameSite: process.env.NODE_ENV==="Development"? "lax":"none", //jab same site none krengee to esme ek property hai secure, esko hmme true krna padegaa  
      secure: process.env.NODE_ENV==="Development"? false :    true,
    })       //so ab the thing is ye kaam krega jab hm deploy krengee , ab ye postman pe kaam nhi kregaaa 
    .json({
      success: true,
      message,//es message mai message bhj dungaa, agr key or value same hai to usse ek baar bhi likh sakta hai     
    });
};
