import {NextFunction, Request, Response} from "express";

const sortByValidation = (req: Request, res: Response, next: NextFunction) => {
    const sortParameters = ['id', 'name', 'youtubeUrl', 'createdAt', 'title', 'shortDescription', 'content', 'blogId', 'blogName', 'createdAt']
    const sortBy = req.query.sortBy

    if (!sortBy) {
        return req.query.sortBy = 'createdAt'
    }

    if (sortParameters.indexOf(sortBy.toString()) === - 1) {
        return req.query.sortBy = 'createdAt'
    }

    next()
}

const sortDirectionValidation = (req: Request, res: Response, next: NextFunction) => {
    const direction = req.query.direction

    if (!direction) {
        return req.query.direction = 'desc'
    }

    if (direction.toString() !== 'asc' || direction.toString() !== 'desc') {
        return req.query.direction = 'desc'
    }

    next()
}

const pageNumberValidation = (req: Request, res: Response, next: NextFunction) => {
    const pageNumber = req.query.pageNumber

    if (!pageNumber) {
        return req.query.pageNumber = '1'
    }

    if (isNaN(Number(pageNumber))) {
        return req.query.pageNumber = '1'
    }

    if (Number(pageNumber) < 0) {
        return req.query.pageNumber = '1'
    }

    next()
}

const pageSizeValidation = (req: Request, res: Response, next: NextFunction) => {
    const pageSize = req.query.pageSize

    if (!pageSize) {
        return req.query.pageSize = '10'
    }

    if (isNaN(Number(pageSize))) {
        return req.query.pageSize = '10'
    }

    if (Number(pageSize) < 0) {
        return req.query.pageSize = '10'
    }

    next()
}

export const queryValidationMiddleware = [sortByValidation, sortDirectionValidation, pageNumberValidation, pageSizeValidation]

