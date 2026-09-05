import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import studentRoutes from "./routes/students.js";
import companyRoutes from "./routes/companies.js";
import driveRoutes from "./routes/drives.js";

const app=express();
const PORT=process.env.PORT||4000;
app.use(helmet());
app.use(cors({origin:process.env.FRONTEND_URL||"http://localhost:5173"}));
app.use(express.json({limit:"1mb"}));
app.use(morgan("dev"));

app.get("/api/health",(req,res)=>res.json({status:"ok",service:"TNP Nexus API"}));
app.use("/api/students",studentRoutes);
app.use("/api/companies",companyRoutes);
app.use("/api/drives",driveRoutes);

app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).json({error:"Internal server error"});
});
app.listen(PORT,()=>console.log(`TNP Nexus API running on http://localhost:${PORT}`));