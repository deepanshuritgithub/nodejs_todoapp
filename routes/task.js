import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import{
    deleteTask,
    getMyTask,
    newTask,
    updateTask,

} from "../controllers/task.js";



const router = express.Router();//router bnaa dengee hmmare tasks ke liyee 


//ab yha pe jo hmme route banana hai vo hm bnaa sktee hai
router.post("/new", isAuthenticated, newTask);//add kr diaa authenticated ko , because ye task wala function ko allow hi tab kregaa jab req.user mai sarri information save ho chuki hogii 


//so ab man lo kisi bhi user ke task chahiye hmme saarre so uske liye banate hai 
router.get("/my", isAuthenticated, getMyTask);


//so mujhe ab 2 router banana hai jis se mai task update kr pao or task delete kr paoo, yha pe router.route ka use krunga kyuki mujhe pta hai in ono ka url same hai    
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask,
//     (req,res, next)=>{
//     next();//yha pe mai likhnunga next ko , then yoou will see ye error bol rha hai , eska mtlb hai ki task ka baad koi function to hai nhi , abhi hmnne ye bnaa diyaa , lekin es wala arrow function ke baad koi function hai nhi chain mai , so jab jab mai next ko call krungaa ,while passing error to hmara jo bhi error ka middleware hai jo hm bnane wala hai vo execute hogaa , so jab jab mai arrow mai next ko pass krungaa   
//   }
  );




export default router;//in the end export default kr dengee apne router ko 