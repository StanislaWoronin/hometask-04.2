import {blogsRepository} from "../repositories/blogs-repository";
import {BlogType} from "../types/blogs-type";
import {ContentPageType} from "../types/content-page-type";
import {paginationContentPage} from "../paginationContentPage";

export const blogsService = {
    async createNewBlog(name: string, youtubeUrl: string): Promise<BlogType> {

        const newBlog: BlogType = {
            id: String(+new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        }

        await blogsRepository.createNewBlog({...newBlog})
        return newBlog
    },

    async giveBlogsPage(searchNameTerm: string  | null,
                        sortBy: string,
                        sortDirection: string,
                        pageNumber: string,
                        pageSize: string): Promise<ContentPageType> {

        const content = await blogsRepository.giveBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
        const totalCount = await blogsRepository.giveTotalCount(searchNameTerm)

        return paginationContentPage(pageNumber, pageSize, content, totalCount)
    },

    async giveBlogById(id: string): Promise<BlogType | null> {
        return await blogsRepository.giveBlogById(id)
    },

    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await blogsRepository.updateBlog(id, name, youtubeUrl)
    },

    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id)
    },
}