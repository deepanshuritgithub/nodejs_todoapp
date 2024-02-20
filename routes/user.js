import express from "express";
import { User } from "../models/user.js"; //ab hmme iski jrurat nhi jab hmmne ye bnaa diya hai
import {
  // deleteUser,
  // getAllUsers,
  getMyProfile,
  register,login,logout,
//   specialFunction,
//   updateUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();
//abhi hmme router se set to kr diyaa ye, but abhi tk ye router es app.js se connected hi nahi hai , kyuki agr check kroo hmmne router export kiya hai pr abhi tak app mai import hi nhi kiyaa kahi bhii

//so abhi ek chizz ki jaise maine btyaa   /users esme bhi chaiyee , niche mai bhi chahiyee , to hm kya sakte hai hmm app.js mai jaake , app.use mai prefix add kr sakte hai
// router.get("/all", getAllUsers); //ab yha pe us function ko set krna padegaa - delete krna hai kyuki iski jrurat nhi hai
// /users/new
router.post("/new", register);
router.post("/login",login);
//so for logout 
router.get("/logout",logout);//agr app chaho to esme authenticated bhi add kr doo , nhi bhi krogee to bhi chall jayega esmee too kyuki hmme krnaa hi kya hai , hmme to cookie ko khtmm krna hai 




//ab yha pe dikat kya aa sakti hai maan lo mujhe ek specific URL bannana hoo
//now ye jo userid wala hai , enke aaage bhi /users phle , enke aage bhi /users  already added hogaa
// router.get("/userid/special", specialFunction);

//eski abhi jrurat nhi hai , update wagera ki koi funtionality nhi de re , hm basic de rhe hai register kroo, or apna task add kro to ye jo niche hai route en sab ki bhi jrurat nhi hai , ya fir bhi agr dena chaho , abhi ke liye yhi rkhte hai sirf 

router.get("/me", isAuthenticated, getMyProfile)










//so agr hamara route same hai to hm kya kr sakta hai , to instead of this that we have done n below , we can do this is
//yha pe bs ek baar route specify kr dengee , eske baad saare methods ese pe change kr dengee
// router
//   .route("/userid/:id")
//   .get(getUserDetails)
//   .put(updateUser)
//   .delete(deleteUser);




//dynamic routing , jaise ki maano lo ki mujhe api bnani haii
// router.get("/userid/:id", getUserDetails);
// //esme hmare saare routes hai , jisme actual functions hai , jo controllers mai hai

// router.put("/userid/:id", updateUser);

// router.delete("/userid/:id", deleteUser);

export default router;

//bhle hi hmne esko alag fle mai add kr dia ho but ye utna cleaner nhi lg rhaa , uske liye hm kya krengee ye jo file hai route esme hm sirf routes rkhengee ,abhi eske pass routes to hai pr sath hi sath function bhi hai so what we will do we wil create a folder called controllers
// , yha pe se hm  function ko nikal denge usko contollers pe set krengee
