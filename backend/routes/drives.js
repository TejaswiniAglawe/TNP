import { Router } from "express";
const router=Router();
router.get("/",async(req,res)=>res.json({drives:[
  {company:"TechNova",role:"Software Engineer",date:"2026-09-18",status:"Open"},
  {company:"CloudSphere",role:"Cloud Associate",date:"2026-09-21",status:"Open"},
  {company:"FinEdge",role:"Analyst",date:"2026-09-27",status:"Upcoming"}
]}));
export default router;