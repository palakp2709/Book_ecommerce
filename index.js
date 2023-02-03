const express = require('express')
const app = express()
const {Books, sequelize } =require('./models')
const {Role} =require('./models')

const {booksRoutes  } =require('./routes/book')
const {authRoutes} = require('./routes/auth')
//const jwt = require('jsonwebtoken')

app.use(express.json())
app.use(booksRoutes)
app.use(authRoutes)

app.get('/',(req,res)=>{ res.send('hello world')})

app.listen(8080 , async ()=>{
    console.log("server is working fine")
    await init()
}) 

async function init(){
    try{
        //{ sequelize.sync({force:true}) used to synchronize sequelize model with db tables }
        //{ sequelize.authenticat }connect with the db and tests whether the given credentials are correct
        await sequelize.sync({force :true})
        const defaultBooks = [
            {
                name:"Alice in wonderland",
                author:"Lewis Carrol",
                price:560
            },
            {
                name:"Pride and Prejudice",
                author:"Jane Austen",
                price:600
            },
            {
                name:"Adventures of Tom Sawyer",
                author:"Mark Twain",
                price:400
            }
        ]

        const defaultRoles =[
            {
                name:"admin"
            },
            {
                name:"user"
            }
        ]
        await Books.bulkCreate(defaultBooks)
        await Role.bulkCreate(defaultRoles)
    }catch(err){
        console.log(err)
    }
}

