import {blogsRepository} from "../repositories/blogs-repository";
import {blogType} from "../types/blogs-type";
import {contentPageType} from "../types/contentPage-type";
import {paginationContentPage} from "../paginationContentPage";


export const blogsService = {
    async createNewBlog(name: string, youtubeUrl: string): Promise<blogType> {
        const newBlog: blogType = {
            id: String(+new Date()),
            name: name,
            youtubeUrl: youtubeUrl,
            createdAt: new Date().toISOString()
        }

        await blogsRepository.createNewBlog({...newBlog})
        return newBlog
    },

    async giveBlogsPage(name: string | null | undefined,
                        sortBy: string,
                        sortDirection: string,
                        pageNumber: string, // номер страницы, которая будет возвращена
                        pageSize: string) // количество элементов на странице
                            : Promise<contentPageType> {
        const content = await blogsRepository.giveBlogs(name, sortBy, sortDirection, pageNumber, pageSize)

        return paginationContentPage(sortBy, sortDirection, pageNumber, pageSize, content)
    },

    async giveBlogById(id: string): Promise<blogType | null> {
        return await blogsRepository.giveBlogById(id)
    },

    async updateBlog(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await blogsRepository.updateBlog(id, name, youtubeUrl)
    },

    async deleteBlogById(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogById(id)
    },
}