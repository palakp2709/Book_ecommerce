const {Books , Sequelize} = require('../models')

exports.createBooks = async (req,res) => {
    const bookData = req.body;

    try{
            const name = bookData.name
            const author = bookData.author
            const price = bookData.price

            const result = await Books.create({name, author, price})
            console.log("book created successfully",result)
            res.status(200).send({  message : "book added successfully"  })
    }catch(err){
        res.status(500).send({  message : "internal server error"  })

    }
}

exports.getAllBooks = async (req,res) => {
    try{
        const result = await Books.findAll();
        res.status(201).send(result)
    }catch(err){
        res.status(500).send({
            message:"internal server error"
        })
    }
}

exports.getBooksById = async (req,res) =>{
    const bookId = req.params.id
    try{
        const result = await Books.findOne({
            where : {
                id : bookId
            }
        })
        res.status(201).send({ message : "book has found" , result})
    }catch(err){
        res.status(500).send({message : "internal server error"})

    }
}

exports.updateBook = async (req,res ) => {
    const bookId = req.params.id
    const bookData =req.body

    if(!(bookData.name && bookData.author && bookData.price)){
        res.status(401).send({message : "name, authore and price is missing"})
    }

    try{
        const name = bookData.name
        const author = bookData.author
        const price = bookData.price

        const result = await Books.findOne({ where: { id : bookId }})
        if(result){
            result.name = name
            result.author =author
            result.price = price

            result.save()
            res.status(200).send({ message:"book got updated"})
        }else{
            res.status(404).senc({ message : "id does not exist"})
        }
    }catch(err){res.status(500).send({ message : "internal sever error"})}
}

exports.deleteBook = async (req,res) => {
    const bookId = req.params.id
    try{
        const result = await Books.destroy({ where : { id : bookId}})
        res.status(201).send({ message : "book got successfully deleted" ,result})
    }catch(err){ res.status(500).send({ message : "internal server error"})}
}