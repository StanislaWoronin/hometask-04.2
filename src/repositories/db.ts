import {MongoClient} from 'mongodb';
import {blogType} from "../types/blogs-type";
import {postType} from "../types/posts-type";
import * as dotenv from "dotenv";
dotenv.config()

const mongoUri = process.env.mongoURI || 'mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority';

const client = new MongoClient(mongoUri)
const db = client.db('blogsAndPostsDb')

export const blogsCollection = db.collection<blogType>('blogs') // почему единственное число?
export const postsCollection = db.collection<postType>('posts')

export async function runDb() {
    try {
        await client.connect()
        await client.db('blogsAndPostsDb').command({ping: 1})
        console.log(`Connected successfully to mongo server: ${mongoUri}`)
    } catch {
        console.log('Can`t connect to db')
        await client.close()
    }
}