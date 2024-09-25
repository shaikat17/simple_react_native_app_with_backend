import mongoose from 'mongoose'
import colors from 'colors'


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Database connection successful ', mongoose.connection.host)
    } catch (error) {
        console.log("🚀 ~ connectDB ~ error:", error)
        
    }
}

connectDB()

export default connectDB