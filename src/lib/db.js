const mongoose = require('mongoose')


const ConnectDb = async () => {

    try {

        if (mongoose.connections[0].readyState) {

            return;

        }
       await mongoose.connect('mongodb://127.0.0.1:27017/nextdb')
        console.log('Connected successfully to db!')
    } catch (err){
        console.log('Error in DB conection!')
    }


}

export default ConnectDb