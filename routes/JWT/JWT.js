const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const router = express.Router();


export function veryflyJWT(req, res, next) {
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

export async function run2(){
    try{
        route.post("/jwt", (req, res) =>{
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: "1d"})
            res.send({token})
        })
    }
    catch{

    }
}

run().catch(err => console.log(err))