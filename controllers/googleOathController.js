import asyncHandler from "../utils/AsyncHandler.js"
const googleOath= asyncHandler(async (req, res)=>{
    const token = req.user.generateAuthToken();
    res.cookie('token', token, {
      httpOnly: true,
      secure: 'true',
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 30 * 6 
    });

    res.redirect('/shop');
});
export default googleOath;