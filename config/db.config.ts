import { connect } from 'mongoose'

export async function connectToDB() {
    try {
        console.log(process.env.DB_URL);
        await connect(process.env.DB_URL || "");
        console.log('Successfully connected to DB');
    } catch (error) { 
        console.log('Error connecting to DB', error)
    }
}