
import JWT from 'jsonwebtoken'

const isLoggedIn = async (req,res,next) => {

const token = req.Cookie.token;

if(!token){
    return res.status(400).json({
        success:false,
        message:'Not Authorized'
    })
}

const payload =  JWT.verify(token, process.env.JWT_SECRET)
      
req.user = {id:payload.id, email:payload.email }

next()

}

export default isLoggedIn