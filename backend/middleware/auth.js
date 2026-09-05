export function requireRole(...allowed){
  return (req,res,next)=>{
    // Production: verify JWT here and attach req.user.
    const role=req.headers["x-demo-role"]||"admin";
    if(!allowed.includes(role)) return res.status(403).json({error:"Forbidden"});
    req.user={role}; next();
  };
}