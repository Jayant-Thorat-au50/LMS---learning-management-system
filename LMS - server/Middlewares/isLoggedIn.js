
import JWT from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {

  const token = req.cookies.Token || null

  if(!token){
    return res.status(400).json({
      success:false,
      message:'Not Authorized'
    })
  }

 try {
  const payload = JWT.verify(token, process.env.JWT_SECRET)

  req.user = {id:payload.id, email:payload.email}

 } catch (error) {
  res.status(400).json({
    success:false,
    message:error.message
  })
 }
 next()
};

export { isLoggedIn };
