const jwt = require('jsonwebtoken');
const {User} = require('../models')
require("dotenv").config();

async function verifyToken(req,res,next){
	const token = req.headers['access-token'];

	if(token){
		try{
			const result = await jwt.verify(token, process.env.JWT_SECRET_KEY)
			if(result){
				req.userId = result.id
				next()
			}else{
				res.status(400).send({msg : 'auth token has expired. Please relogin'})
				return;
			}
		}catch(err){
			res.status(400).send({msg : 'auth token has expired. Please relogin'})
			return;	
		}


	}else{
		res.status(401).send({msg : 'auth token is missing'})
		return;
	}
}


async function isAdmin(req,res,next){
	const userId = req.userId;
	try{
		const user = await User.findByPk(userId)
		const userRoles = await user.getRoles();
		for(let i=0 ; i<userRoles.length ; i++){
			if(userRoles[i].dataValues.name === 'admin'){
				next()
				return;
			}
		}
		res.status(400).send({ message : "user does not have admin access"})
		return;
	}catch(err){
		res.status(500).send({
			message : "internal server error"
		})
	}
}


// const isAdmin = async (req,res,next) =>{
//     const user  = await User.findOne({
//         userId:req.body.userId
//     })

// 	const userRoles = await user.getRoles();
// 		for(let i=0 ; i<userRoles.length ; i++){
// 			if(userRoles[i].dataValues.name === 'admin'){
// 				next()
// 				return;
// 			}else{
// 				res.status(403).send({
// 					message:"require admin role"
// 				})
// 				return
// 		}

    
//     }
    
// }

module.exports = {
    verifyToken , isAdmin
}
