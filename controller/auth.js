const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const {User} = require('../models')

async function signUp(req,res){
	const username = req.body.username;
	const email = req.body.email;
	const password = bcrypt.hashSync(req.body.password, 8);

	try{
		const user = await User.create({username,email,password})
		
		console.log('user', user)
		if(req.body.roles){
			const roles = req.body.roles;
			const result = await user.setRoles(roles)
			console.log('user defsined roles', result)

		}else{
			const result = await user.setRoles([1])
			console.log("default roles",result)
		}

		res.send({msg :'User has been created successfully'})
	}catch(err){
		res.status(500).send({msg : 'Internal Server error'})
	}


	
}

async function signIn(req,res){
	const username = req.body.username;
	const password = req.body.password;

	try{
		const user = await User.findOne({
			where : {
				username : username
			}
		})
		if(user){
			const validPassword = bcrypt.compareSync(password,user.password)
			if(!validPassword){
				 return res.status(400).send({msg : 'Username/password is not correct'})	
			}

			const token = await jwt.sign({id : user.id}, process.env.JWT_SECRET_KEY, {
				expiresIn: '1h'
			})
			//res.send({msg : 'Token',token})

			const authorities = [];
			const roles = await user.getRoles();
			//res.send(roles)
		
			for(let i=0; i<roles.length;i++){
				authorities.push(roles[i].name)
			}
			const finalUser = {
				id: user.id,
				name: user.name, 
				email: user.email,
				username:user.username,
				token: token,
				authorities: authorities
			}

		return	res.send(finalUser)
		
		}else{
		return	res.status(400).send({msg : 'Username/password is not correct'})	
		}
	}catch(err){
	return	res.status(500).send({msg : 'Internal Server Error', err})
		
	}
}

module.exports = {signUp,signIn}