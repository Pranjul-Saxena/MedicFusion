import mongoose from "mongoose";
mongoose.set('strict', false);

const connectionToDB = async (connection) => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI || `mongodb://127.0.0.1:27017/Sample`
        )
        if (connection) {
            console.log(`Connected to MongoDB successfully : ${connection.host}`);
        }
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}
export default connectionToDB;