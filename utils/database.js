import mongoose from "mongoose";

let isConnected = false; 

export const connectToDB = async () => {
    mongoose.set('strictQuery');

    if(isConnected) {
        console.log('mongodb connected');

    }

    try {
        console.log('trying');
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "quotr",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('mongodb connected');
    } catch (error) {
        console.log(error);
    }
}