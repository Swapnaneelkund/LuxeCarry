import jwt from "jsonwebtoken";
const generateToken=(user)=>{
    const token=jwt.sign({user:user.email,id:user._id},process.env.JWT_KEY)
    return token;
}
export default generateToken;