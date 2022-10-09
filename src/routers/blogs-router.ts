import {Request, Response, Router} from "express";
import {blogRouterValidation} from "../middlewares/blogRouter-validation-middleware";
import {postForBlogValidation} from "../middlewares/postRouter-validation-middleware";
import {blogsService} from "../domain/blogs-service";
import {postsService} from "../domain/posts-service";
import {BlogType} from "../types/blogs-type";
import {ContentPageType} from "../types/content-page-type";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {queryValidationMiddleware} from "../middlewares/query-validation-middleware";
import {InputQueryParamsType} from "../types/queryParams-type";
import {PostType} from "../types/posts-type";

export const blogsRouter = Router({})

blogsRouter.post('/',
    authenticationGuardMiddleware,
    ...blogRouterValidation,
    async (req: Request,
           res: Response<BlogType>) => {

        const newBlog = await blogsService.createNewBlog(req.body.name, req.body.youtubeUrl)

        res.status(201).send(newBlog)
    }
)

blogsRouter.post('/:id/posts',
    authenticationGuardMiddleware,
    ...postForBlogValidation,
    async (req: Request<{id: string}>,
           res: Response<PostType>) => {

        const existsBlog = await blogsService.giveBlogById(req.params.id)

        if (!existsBlog) {
            return res.sendStatus(404)
        }

        const newPost = await postsService.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.params.id)
        res.status(201).send(newPost)
    }
)

blogsRouter.get('/',
    // @ts-ignore
    ...queryValidationMiddleware,
    async (req: Request<{}, {}, {}, InputQueryParamsType>,
           res: Response<ContentPageType>) => {

    const pageWithBlogs: ContentPageType = await blogsService
        .giveBlogsPage(req.query.searchNameTerm,
                       req.query.sortBy,
                       req.query.sortDirection,
                       req.query.pageNumber,
                       req.query.pageSize)

    if (!pageWithBlogs) {
        return res.sendStatus(404)
    }

    res.status(200).send(pageWithBlogs)
})

blogsRouter.get('/:id',
    async (req: Request<{id: string}>,
                   res: Response<BlogType>) => {

    const blog = await blogsService.giveBlogById(req.params.id)

    if (!blog) {
        return res.sendStatus(404)
    }

    res.status(200).send(blog)
})

blogsRouter.get('/:id/posts',
    // @ts-ignore
    ...queryValidationMiddleware,
    async (req: Request<{id: string}, {}, {}, InputQueryParamsType>,
           res: Response<ContentPageType>) => {

    const blog: BlogType | null = await blogsService.giveBlogById(req.params.id)

    if (!blog) {
        return res.sendStatus(404)
    }

    const pageWithPosts = await postsService
        .givePostsPage(req.query.sortBy,
                       req.query.sortDirection,
                       req.query.pageNumber,
                       req.query.pageSize,
                       req.query.blogId)

    res.status(200).send(pageWithPosts)
})

blogsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...blogRouterValidation,
    async (req: Request<{id: string}>,
           res: Response<BlogType | null>) => {

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
    async (req: Request<{id: string}>,
           res: Response) => {

        const isDeleted = await blogsService.deleteBlogById(req.params.id)

        if (!isDeleted) {
            return res.sendStatus(404)
        }

        res.sendStatus(204)
    }
)