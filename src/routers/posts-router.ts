import {Request, Response, Router} from "express";
import {postRouterValidation} from "../middlewares/postRouter-validation-middleware";
import {postsService} from "../domain/posts-service";
import {postType} from "../types/posts-type";
import {contentPageType} from "../types/contentPage-type";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {queryValidationMiddleware} from "../middlewares/query-validation-middleware";

export const postsRouter = Router({})

postsRouter.post('/',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    async (req: Request, res: Response) => {
        const newPost: postType = await postsService.createNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)

        if (!newPost) {
            return res.sendStatus(404)
        }

        res.status(201).send(newPost)
    }
)

postsRouter.get('/',
    ...queryValidationMiddleware,
    async (req: Request, res: Response) => {
    const pageWithPosts: contentPageType = await postsService
        .givePostsPage(req.query.sortBy as string,
                       req.query.sortDirection as string,
                       req.query.pageNumber as string,
                       req.query.pageSize as string,
                       req.query.blogId as string)

    if (!pageWithPosts) {
        return res.sendStatus(404)
    }

    res.status(200).send(pageWithPosts)
})

postsRouter.get('/:id', async (req: Request, res: Response) => {
    const post: postType | null = await postsService.givePostById(req.params.id)

    if (!post) {
        return res.sendStatus(404)
    }

    res.status(200).send(post)
})

postsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    async (req: Request, res: Response) => {
        const isUpdate = await postsService
            .updatePost(req.params.id,
                        req.body.title,
                        req.body.shortDescription,
                        req.body.content,
                        req.body.blogId)

        if (!isUpdate) {
            return res.sendStatus(404)
        }

        const post = await postsService.givePostById(req.params.id)
        res.status(204).send(post)
    }
)

postsRouter.delete('/:id',
    authenticationGuardMiddleware,
    async (req: Request, res: Response) => {
        const isDeleted = await postsService.deletePostById(req.params.id)

        if (isDeleted) {
            return res.sendStatus(204)
        }

        res.sendStatus(404)
    }
)