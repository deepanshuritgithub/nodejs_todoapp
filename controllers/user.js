import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; //now this is in  our feature.js
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

// export const getAllUsers = async (req, res) => {
// //or get all users hmne bnaya nhi or hmme iski jrurat nhi , kyuki ye basically function uske liye hai mann lo admin ka dashboard bhi bnana ho hmme , admin ke liye spoecific or hmme saare users dikhane ho tab ke liyee basiucallu ye function , to ese hmm bna nhi rhe hai 

  
//   // // User.find({name:"Abhi"})
//   // const users = await User.find({});
//   // // console.log(req.query);
//   // const keyword = req.query.keyword;
//   // console.log(keyword);
//   // res.json({
//   //   success: true,
//   //   // users:[],
//   //   // users:users,
//   //   users, //agr key or value same hai to ese hi pass kr doo
//   // });
// };

//login

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //ab hmara sabse phle jo kaam hai user ko dhundna so
    const user = await User.findOne({ email }).select("+password"); //hm email se dhudegee user ko ,, and select ke andar mai specify kr sakta hu kon kon  si field chahiye mujhe  , agr mai likh deta hu select mai email , to ye sirf email hi find krke dega user ki or kuch nhi but mujhe chahiye jo data hai saraa ye to mile hi +password bhi mile so +password in a string case , so ab mai user.pasword access kr sakta hu or mujhe pta lag jayegaa password match hua hai ya nhi

    //agr user nhi mila to hme again error throw krna hai ki user doesn't exist or Invalid Email or Password
    // if (!user) {
    //   //or hm kya bolenge ki agr user  nhii hai to erroor throw krna hai
    //   return res.status(404).json({
    //     //status 404 means http not found
    //     success: false,
    //     message: "Invalid Email or Password",
    //   });
    // }

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400)); //staus code 400 bad request

    const isMatch = await bcrypt.compare(password, user.password);
    //encrypted wala password hm ese hi access kr lengee user.password se, user.password krungaa to password ese access hi nhi kr sakta esa kyu, kyuki maine specify kiya hai ,models/user.js mai in the field of password , select false , eska tlb jab jab mai user ka data access krungaa  to merko password nhi aayegaa kyuki maine password waki field mai select false kiya hua hai so merko manually select krna padega specially password , ki mujhe password chahiye right , so

    if (!isMatch) {
      //or hm kya bolenge ki agr user  nhii hai to erroor throw krna hai
      // return res.status(404).json({
      //   //status 404 means http not found
      //   success: false,
      //   message: "Invalid Email or Password",
      // });

      return next(new ErrorHandler("Invalid Email or Password", 400)); //staus code 400 bad request
    }

    //agr match ho jate hai to hm send cookie ko call krenge
    sendCookie(user, res, `welcome back ,${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};



//register
export const register = async (req, res) => {
  try{

    //hmme register waala mai krna hai bcrypt ka use
    const { name, email, password } = req.body; //so data lenge hm req.body mai se
    //so ab hm user dhundegee so
    let user = await User.findOne({ email });
    
    // if (user) {
      //   //or hm kya bolenge ki agr user hai to erroor throw krna chahiyee , uska bhi dekhenge , pr abhi temporary ye dere hai
      //   return res.status(404).json({
        //     //status 404 means http not found
        //     success: false,
        //     message: "User Already Exists",
        //   });
        // }
        
        if (user) return next(new ErrorHandler("User Already Exists", 404)); //staus code 400 bad request
        
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        //otherwise agr user nhi hai to us case mai user create krna hai , password ese nhi bhjnegee , password phle hash krna padegaa
        user = await User.create({ name, email, password: hashedPassword }); //abhi hash password ko yha bhjna hai to make sure , jo key hai hhmaraa vo abhi password hai kyuki agr mai yha pe jaoo models/user.js vha pe hmmne password receive kr rha hai hmm ,so make sure ki password ke naam pe hi hmme bhjna hai hashed password , so ese hmmne user create kr liyaa, user create hone ke baad hm simply message de dengee
        //payload mai jo data bhjna hai vo kya bhjna haii , vo bhjna hai hmme user ki id , so user create krne ke baad hme save bhi to krna hai , payload mai hmmeare pass user ki id hogi es time pe to id hm save kr lenge _id: with user._id //so remember database mai hmare pass _id krke kyu hoti hai
        
        sendCookie(user, res, "Registered Successfully", 201);
      }
      catch(error){
        next(error);
      }
        // const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);
        
        // ////2nd chiz jo hmme esme bhjni hai vo ye hai token generate krna hai , token ki value hm bhj dengee token mai , ab yha pe hmm options pass kr sakte hai bhut saare
        // res.status(201).cookie("token",token,{
          //   //one more data i want to pass here which is optional
          //   httpOnly: true,
          //   maxAge: 15*60*1000,//15 minutes
          //   // HttpOnly is an additional flag included in a Set-Cookie HTTP response header. Using the HttpOnly flag when generating a cookie helps mitigate the risk of client side script accessing the protected cookie (if the browser supports it).
          // }).json({
            //   success:true,
            //   message:"Registered Successfully",
            // })
            
            //note: abhi ye hm frontend mai kese krte hai ye hm pe depend krta hai ya to hm ese hi chdd de , hmm khe de success true ho , to register ho chuka hai , to hm redirect kr dengee frontend mai
            // ya fir hm chahte hai ki register ke sath hi login bhi khud ho jayee to hm yha pe cookie send kr sakte hai
            
  // //ab ye URL gar access bhi kru browser mai , to output jo aayegaa cannot get users /new aayegaa kyuki browser se hm get request access kr sakta hai

  // //hmme static data nhi chahiye , hmme chiye actual data to vo kese aayegaa
  // const { name, email, password } = req.body; //ye 3no chize hmm bhej dengee as it is , name mai name , email mai aemail , passsword mai password , agr key r value pair same hai to hmm ek hi baar decalre kr sakta hai

  // // User.find({name:"Abhi"})
  // await User.create({
  //   //yha pe ese variable ai declare krna ki jrurat nhi hai sidha await lagana hai
  //   // name:"Deepanhshu",
  //   // email:"kukrejagolu8@gmail.com",
  //   // password:"djkand",
  //   name,
  //   email,
  //   password,
  // });

  // res.status(201).cookie("tempi", "lol").json({
  //   //status 201 ka mtlb hai created
  //   success: true,
  //   // users:[],
  //   // users:users,
  //   message: "Reistered Successfully", //yha pe hmm message de skte hai
  // });
};

//   export const specialFunction = async(req,res)=>{
//     res.json({
//         success:true,
//         message:"Just Joking",
//     })
// }

//ab isko async bnana ki bhi jrurat nhi
export const getMyProfile = (req, res) => {
  //so ab mujhe apni profile kese milegii, uske liye mannlo mere pass id hai apni
  const id = "myid";
  //so agr id hai mere pass, to mai simply apni id se apni information nikal sakta hu, pr id kha se aaeygeii, id hi to nhi hai, so uske liye what we can do ,
  // we make sure ki login hai hm, or token mai se apni id access kr sakta hai, kyuki hmara pass token hai, cookie parser hai hmara pass apni id access krne ke liye
  //so hm dono trike se dekhngee isAuthenticated  age ye nhi bnana hai to on the sopt kese kr sakta hai, so sabse phle  hmme cookie parser chahiye , so let's use cookie parser in our app.js , so using middleware mai app .use mai cookieparser()

  //so ab mai cookies access kr sakta hu, usme se token le lunga mai
  //so ma kya krunga ki token le lunga kha se req.cookies mai se

  // cut part
  // const { token } = req.cookies;
  // console.log(token,"token");//identifier dall diyaa

  // if (!token) { //agr token nhi hua to mai khe dungaa login first
  //   return res.status(404).json({//status 404 means http not found
  //     success: false,
  //     message :"Login First",
  //   })
  // }

  // // //agr token hai to mai es token mai se hi information le sakta hu saari  jaise ki decoded data
  //  const decoded = jwt.verify(token, process.env.JWT_SECRET)//so es se merko decoded data mila , so ussme se hm access kr lengee apni id koo

  //  console.log(decoded._id);
  //decoded data mila to hm usme se id access kr lengee
  // const user = await User.findById(decoded._id);//mai yha pe apni id pass krke , response mai apna information bhej skta hu , mai ese minformation bhjj sakta hu lekin id kha se aayegii
  res.status(200).json({
    success: true,
    user: req.user, //esme req.user se user ki value de denge or kuch nhi
  }); //mai ese apne app ko information bhj sakta hu, agr mere pass id hoo , pr id kese aayegi yhi to diikaat hai

  // // const id= req.body.id;
  // const {id}=req.params;//ya fir ese destructue kr do dono same hi hai
  // const user= await User.findById(id);//find by id ek method hai esme hmme id pass krni hai , ya to mai kyaa kruu , ya to mai id access kr loo uper aese
  // // console.log(req.params);
  // res.json({
  //     success:true,
  //     user,

  // });
};

// export const updateUser = async(req,res)=>{
//     // const id= req.body.id;
//     const {id}=req.params;//ya fir ese destructue kr do dono same hi hai
//     const user= await User.findById(id);//find by id ek method hai esme hmme id pass krni hai , ya to mai kyaa kruu , ya to mai id access kr loo uper aese
//     // console.log(req.params);
//     res.json({
//         success:true,
//         message: "updated",

//     });
// }

// export const deleteUser = async(req,res)=>{
//     // const id= req.body.id;
//     const {id}=req.params;//ya fir ese destructue kr do dono same hi hai
//     const user= await User.findById(id);//find by id ek method hai esme hmme id pass krni hai , ya to mai kyaa kruu , ya to mai id access kr loo uper aese
//     // console.log(req.params);
//     //  await User.remove() //jo user delete krna hai database se uski id dedenge or usko delete kr dengee or niche message dde dengee deleted

//     res.json({
//         success:true,
//         message: "deleted",

//     });
// }

export const logout = (req, res) => {//yha pe jaise async function nhi hai to yha pe jrurat nahi hai try catch ki and same for above code too 
  res
    .status(200)
    .cookie("token", " ", {
      expires: new Date(Date.now()),
      //eske cookie function bhi smae hone chahioye jo hmmne features.js ma kre hai ye jo niche wala hai, otherwise ye kaam nhi krega 
      sameSite: process.env.NODE_ENV==="Development"? "lax":"none",
      secure: process.env.NODE_ENV==="Development"? false :    true,
    })
    .json({
      //cookie mai jo token ha usko kr doo empty or options mai krko expires maii new Date(Date.now) tabhi ke tabhi expire ho jayegaa
      success: true,
      user: req.user,
      message: "successfully deleted my cookie",
    });
};

//201 is the created status code means that the request was successfully fullfilled
//200 means success
//400 bad request
//401 -> The 401 (Unauthorized) status code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.

//so hmmnee ab es model wala ke liyee bnaa liyaa , user.je ke liye, pr abhii task ka banana bachaa haii
// ,so now what we doo , task ka model hmnee phlee hi bnaaya hua hai
