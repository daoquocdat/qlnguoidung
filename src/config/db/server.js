const mongoose = require('mongoose');


async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/qlnguoidung', {
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!!')
    }catch(error){
        console.log("error",error)
        console.log('connect failure')
    }
    
}



module.exports = { connect };