const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const verifyJWT = (req, res, next) =>{
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(404).send({messages: "unauthorized access"})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, decoded){
        if(err){
            return res.status(403).send({messages: "Forbidden access"})
        }
        req.decoded = decoded
        next()
    })
}

const uri = `mongodb+srv://endgame:${process.env.DB_PASSWORD}@cluster0.flakcz3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// console.log(uri)

const  run2 = async () =>{
    
    try{
        const userData = client.db('Promise_hospital').collection('userData');
        
        router.get('/jwt', async(req, res) =>{
            const email = req.query.email 
            console.log(email)
            const query = {email: email}
            const user = await userData.findOne(query)
            if(user){
                const token = jwt.sign({email}, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
                return res.send({accessToken: token})
            }
            res.status(403).send({ accessToken: ""})
        })
    }
    catch{

    }
}

run2().catch(err => console.log(err))

module.exports = verifyJWT;