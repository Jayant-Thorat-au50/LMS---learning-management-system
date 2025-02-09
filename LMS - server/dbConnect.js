const mongoose = require('mongoose')
const mongodbUri = 'mongodb+srv://jayantthorat1999:taw3KkZcGgmuqBUN@<cluster>.mongodb.net/LMS?retryWrites=true&w=majority'
const dbConnect =  () => {
      mongoose.connect(mongodbUri)
      .then(() => console.log('db connected successfully')
      )
      .catch(()=> console.log('falied to connect the db')
      )
}

module.exports = dbConnect;