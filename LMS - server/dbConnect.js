const mongoose = require('mongoose')
const mongodbUri = 'mongodb://127.0.0.1:27017/LMS'

const dbConnect =  () => {
      mongoose.connect(mongodbUri)
      .then(() => console.log('db connected successfully')
      )
      .catch(()=> console.log('falied to connect the db')
      )
}

module.exports = dbConnect;