const jwt=require('jsonwebtoken');  //import jwt from 'jsonwebtoken';
const config=require('config');

module.exports=(req, res, next)=>{
  if (req.method==='OPTIONS') return next();
  try {
    const token=req.headers.authorization.split(' ')[1]; //"Bearer Token"
    //console.log('req: ', req);
    if (!token) return res.status(401).json({message: 'Нет авторизации'});
    //console.log('token: ', token);
    const decoded=jwt.verify(token, config.get('jwtSecret'));
    //console.log('decoded: ', decoded);
    req.user=decoded;
    next();
  } catch (e) {
    console.log('auth-middleware__catch');
    res.status(401).json({message: 'Нет авторизации'});
  }
}