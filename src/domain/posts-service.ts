import {postsRepository} from "../repositories/posts-repository";
import {blogsRepository} from "../repositories/blogs-repository";
import {postType} from "../types/posts-type";
import {contentPageType} from "../types/contentPage-type";
import {paginationContentPage} from "../paginationContentPage";

export const postsService = {
    async createNewPost(title: string, shortDescription: string, content: string, id: string): Promise<postType> {
        const newPost: postType = {
            id: String(+new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: id,
            blogName: await blogsRepository.giveBlogName(id),
            createdAt: new Date().toISOString()
        }

        await postsRepository.createNewPost({...newPost})
        return newPost
    },

    async givePostsPage(sortBy: string,
                        sortDirection: string,
                        pageNumber: string,
                        pageSize: string) : Promise<contentPageType> {
        const content = await postsRepository.givePosts(sortBy, sortDirection, pageNumber, pageSize)

        return paginationContentPage(sortBy, sortDirection, pageNumber, pageSize, content)
    },

    async givePostById(id: string): Promise<postType | null> {
        return await postsRepository.givePostById(id)
    },

    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
        return await postsRepository.updatePost(id, title, shortDescription, content, blogId)
    },

    async deletePostById(id: string): Promise<boolean> {
        return await postsRepository.deletePostById(id)
    },
}