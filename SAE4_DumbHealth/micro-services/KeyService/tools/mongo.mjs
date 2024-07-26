import mongoose from "mongoose"

const connectToTestDb = async () => {
    const {MongoMemoryServer} = await import('mongodb-memory-server');
    await mongoose.connect((await MongoMemoryServer.create()).getUri());
}

export {connectToTestDb}