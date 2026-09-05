import { Router } from "express";
import { getStudents } from "../controllers/studentController.js";
import { requireRole } from "../middleware/auth.js";
const router=Router();
router.get("/",requireRole("admin","placement_officer","faculty","recruiter"),getStudents);
export default router;