import { listStudents } from "../models/studentModel.js";
export async function getStudents(req,res,next){
  try{
    const result=await listStudents(req.query);
    res.json(result);
  }catch(e){next(e)}
}