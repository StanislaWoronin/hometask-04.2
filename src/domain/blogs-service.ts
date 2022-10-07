import {blogsRepository} from "../repositories/blogs-repository";
import {blogType} from "../types/blogs-type";
import {contentPageType} from "../types/contentPage-type";
import {paginationContentPage} from "../paginationContentPage";
import {givePagesCount} from "../helperFunctions";


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

    async giveBlogsPage(searchNameTerm: string,
                        sortBy: string,
                        sortDirection: string,
                        pageNumber: string, // номер страницы, которая будет возвращена
                        pageSize: string) // количество элементов на странице
                            : Promise<contentPageType> {

        const content = await blogsRepository.giveBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
        const totalCount = await blogsRepository.giveTotalCount(searchNameTerm)
        const pagesCount = givePagesCount(totalCount, pageSize)

        return paginationContentPage(pageNumber, pageSize, content, pagesCount)
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