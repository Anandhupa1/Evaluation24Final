const jwt =require("jsonwebtoken");

async function auth (req,res,next){

if(!req.headers.authtoken){res.status(401).json({message:"You are not authorized"})}
else {
    let incToken= req.headers.authtoken;
    await jwt.verify(incToken, 'masai', function(err, decoded) {
  
   
       //_________________________
          if(err){
            
            res.status(401).json({error:"invalid token"})
        }
        else {
            //console.log(decoded.userId,"decoded");
            req.body.userId =decoded.userId;
            console.log(req.body)

           next()
        }
    }); 

}






}



module.exports={auth}