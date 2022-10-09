import {Request, Response, Router} from "express";
import {postRouterValidation} from "../middlewares/postRouter-validation-middleware";
import {postsService} from "../domain/posts-service";
import {PostType} from "../types/posts-type";
import {ContentPageType} from "../types/content-page-type";
import {authenticationGuardMiddleware} from "../middlewares/authentication-guard-middleware";
import {queryValidationMiddleware} from "../middlewares/query-validation-middleware";
import {InputQueryParamsType} from "../types/queryParams-type";

export const postsRouter = Router({})

postsRouter.post('/',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    async (req: Request<{}, {}, {title: string, sortDescription: 'asc' | 'desc', content: string, blogId: string}, {}>,
           res: Response<PostType>) => {

        const newPost = await postsService.createNewPost(req.body.title, req.body.sortDescription, req.body.content, req.body.blogId)

        if (!newPost) {
            return res.sendStatus(404)
        }

        res.status(201).send(newPost)
    }
)

postsRouter.get('/',
    // @ts-ignore
    ...queryValidationMiddleware,
    async (req: Request<{}, {}, {}, InputQueryParamsType>,
           res: Response<ContentPageType>) => {

    const pageWithPosts: ContentPageType = await postsService
        .givePostsPage(req.query.sortBy,
                       req.query.sortDirection,
                       req.query.pageNumber,
                       req.query.pageSize,
                       req.query.blogId)

    if (!pageWithPosts) {
        return res.sendStatus(404)
    }

    res.status(200).send(pageWithPosts)
})

postsRouter.get('/:id',
    async (req: Request<{id: string}>,
                   res: Response<PostType>) => {

    const post = await postsService.givePostById(req.params.id)

    if (!post) {
        return res.sendStatus(404)
    }

    res.status(200).send(post)
})

postsRouter.put('/:id',
    authenticationGuardMiddleware,
    ...postRouterValidation,
    async (req: Request<{id: string}, {}, {title: string, sortDescription: 'asc' | 'desc', content: string, blogId: string}, {}>,
           res: Response<PostType | null>) => {

        const isUpdate = await postsService
            .updatePost(req.params.id,
                        req.body.title,
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
    async (req: Request<{id: string}>,
           res: Response) => {

        const isDeleted = await postsService.deletePostById(req.params.id)

        if (isDeleted) {
            return res.sendStatus(204)
        }

        res.sendStatus(404)
    }
)