const express = require('express');
var jwt = require('jsonwebtoken');
const app = express()
require('dotenv').config();

const cors = require('cors');
const { query } = require('express');



//route import//
const nameOneRouter = require('./routes/NameOne/nameOne')
const nameTwoRouter = require('./routes/nameTwo/nameTwo')
const nameThreeRouter = require('./routes/nameThree/nameThree')
const nameFourRouter = require('./routes/nameFour/nameFour')
const nameFiveRouter = require('./routes/nameFive/nameFive')
const nameSixRouter = require('./routes/nameSix/nameSix')

// route import end//



const port = process.env.PORT || 5000



app.use(cors())
app.use(express.json())




app.use(nameOneRouter)
app.use(nameTwoRouter)
app.use(nameThreeRouter)
app.use(nameFourRouter)
app.use(nameFiveRouter)
app.use(nameSixRouter)








app.get('/', (req, res) => {
    res.send('bismillahir rohmanir rohim')

})


app.listen(port, () => {
    console.log('server port', port)
})
//add