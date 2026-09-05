import { Router } from "express";
const router=Router();
router.get("/",async(req,res)=>res.json({companies:[
  {name:"TechNova",offers:824},{name:"CloudSphere",offers:642},
  {name:"FinEdge",offers:518},{name:"DataGrid",offers:403}
]}));
export default router;