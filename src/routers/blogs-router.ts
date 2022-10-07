import {Request, Response, Router} from "express";
import {blogRouterValidation} from "../middlewares/blogRouter-validation-middleware";
import {postForBlogValidation} from "../middlewares/postRouter-validation-middleware";
import {blogsService} from "../domain/blogs-service";
import {postsService} from "../domain/posts-service";
import {blogType} from "../types/blogs-type";
import {contentPageType} from "../types/contentPage-type";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {queryValidationMiddleware} from "../middlewares/query-validation-middleware";

export const blogsRouter = Router({})

blogsRouter.post('/',
    authenticationGuardMiddleware,
    ...blogRouterValidation,
    async (req: Request, res: Response) => {
        const newBlog: blogType = await blogsService.createNewBlog(req.body.name, req.body.youtubeUrl)

        res.status(201).send(newBlog)
    }
)

blogsRouter.post('/:id/posts',
    authenticationGuardMiddleware,
    ...postForBlogValidation,
    async (req: Request, res: Response) => {
        const existsBlog = await blogsService.giveBlogById(req.params.id)

        if (!existsBlog) {
            return res.sendStatus(404)
        }

        const newPost = await postsService.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.params.id)
        res.status(201).send(newPost)
    }
)

blogsRouter.get('/',
    ...queryValidationMiddleware,
    async (req: Request, res: Response) => {
    const pageWithBlogs: contentPageType = await blogsService
        .giveBlogsPage(req.query.searchNameTerm as string,
                       req.query.sortBy as string,
                       req.query.sortDirection as string,
                       req.query.pageNumber as string,
                       req.query.pageSize as string)

    if (!pageWithBlogs) {
        return res.sendStatus(404)
    }

    res.status(200).send(pageWithBlogs)
})

blogsRouter.get('/:id', async (req: Request, res: Response) => {
    const blog: blogType | null = await blogsService.giveBlogById(req.params.id)

    if (!blog) {
        return res.sendStatus(404)
    }

    res.status(200).send(blog)
})

blogsRouter.get('/:id/posts',
    ...queryValidationMiddleware,
    async (req: Request, res: Response) => {
    const blog: blogType | null = await blogsService.giveBlogById(req.params.id)

    if (!blog) {
        return res.sendStatus(404)
    }

    const pageWithPosts: contentPageType = await postsService
        .givePostsPage(req.query.sortBy as string,
                       req.query.sortDirection as string,
                       req.query.pageNumber as string,
                       req.query.pageSize as string,
                       req.query.blogId as string)

    res.status(200).send(pageWithPosts)
})

blogsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...blogRouterValidation,
    async (req: Request, res: Response) => {
        const isUpdate = await blogsService.updateBlog(req.params.id, req.body.name, req.body.youtubeUrl)

        if (!isUpdate) {
            return res.sendStatus(404)
        }

        const blog = await blogsService.giveBlogById(req.params.id)
        res.status(204).send(blog)
    }
)

blogsRouter.delete('/:id',
    authenticationGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await blogsService.deleteBlogById(req.params.id)

        if (!isDeleted) {
            return res.sendStatus(404)
        }

        res.sendStatus(204)
    }
)