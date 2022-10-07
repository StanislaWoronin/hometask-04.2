import {blogsCollection} from "./db";
import {blogsType, blogType} from "../types/blogs-type";
import {giveSkipNumber} from "../helperFunctions";

export const blogsRepository = {
    async createNewBlog(newBlog: blogType): Promise<blogType> {
        await blogsCollection.insertOne(newBlog)
        return newBlog
    },

    async giveBlogs(searchNameTerm: string,
                    sortBy: string,
                    sortDirection: string,
                    pageNumber: string,
                    pageSize: string): Promise<blogsType> {

        const filter: any = {}

        if (searchNameTerm) {
            filter.searchNameTerm = {$regex: searchNameTerm, $options: 'i'}
        }

        return await blogsCollection
            .find(filter, {projection: {_id: false}})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(giveSkipNumber(pageNumber, pageSize))
            .limit(Number(pageSize))
            .toArray()
    },

    async giveTotalCount(searchNameTerm: string | null): Promise<number> {
        return await blogsCollection.countDocuments({searchNameTerm: {$regex: searchNameTerm, $options: 'i'}})
    },

    async giveBlogById (id: string): Promise<blogType | null> {
        return await blogsCollection.findOne({id: id}, {projection: {_id: false}})
    },

    async giveBlogName (id: string): Promise<string> {
        const blog = await blogsRepository.giveBlogById(id)
        if (!blog) {
            return ''
        }

        return blog.name
    },

    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({id: id}, {$set: {name: name, youtubeUrl: youtubeUrl}})

        return result.matchedCount === 1
    },

    async deleteBlogById(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})

        return result.deletedCount === 1
    },

    async deleteAllBlogs(): Promise<boolean> {
        try {
            await blogsCollection.deleteMany({})
            return true
        } catch (e) {
            console.log('blogsCollection => deleteAllBlogs =>', e)
            return false
        }
    }
}