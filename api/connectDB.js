import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connection = {}; //1. create a variable to store a connection

export const connectDB = async () => {
    try{
        if(connect?.isConnected){ //2. if connection exists do nothing
            console.log("using existing connection");
            return;
        }
        else{ //3. else create a connection
            console.log("connecting...")
            const db = await connect(`${process.env.DB_LINK}`);
            console.log("database: ", db);
            connection.isConnected = db.connections[0].readyState; // 4. if connected db will have a value ready state store it in the variable
            console.log("Database connected"); 
        }
    }
    catch(error){
        console.error(error);
    }
}