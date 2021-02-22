import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL

export async function connectToMongoDB() {
    if (mongoUrl) {
        try {
            mongoose.connect(
                mongoUrl,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false
                },
                () => console.log('Connected to MongoDB')
            )
        } catch (err) {
            console.log('Unable to connect to MongoDB')
        }
    } else {
        console.log('No MongoDB connection url found')
    }
}
