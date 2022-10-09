import {NextFunction, Request, Response} from "express";
import {SortDescriptionType, SortParameters} from "../types/queryParams-type";

const sortByValidation = (req: Request<{}, {}, {}, {sortBy: SortParameters}>,
                          res: Response,
                          next: NextFunction) => {

    const sortParameters = Object.values(SortParameters)
    const sortBy = req.query.sortBy

    if (typeof sortBy !== 'string') {
        req.query.sortBy = SortParameters.CreatedAt // 'createdAt'
    }

    if (!sortParameters.includes(sortBy)) {
        req.query.sortBy = SortParameters.CreatedAt
    }

    next()
}

const sortDirectionValidation = (req: Request<{}, {}, {}, {sortDirection: SortDescriptionType}>,
                                 res: Response,
                                 next: NextFunction) => {

    const sortDescriptionType = Object.values(SortDescriptionType)
    const sortDirection = req.query.sortDirection

    if (!sortDirection) {
        req.query.sortDirection = SortDescriptionType.Distending
    }

    if (!sortDescriptionType.includes(sortDirection)) {
        req.query.sortDirection = SortDescriptionType.Distending
    }

    next()
}

const pageNumberValidation = (req: Request, res: Response, next: NextFunction) => {

    const pageNumber = req.query.pageNumber

    if (!pageNumber) {
        req.query.pageNumber = '1'
    }

    if (isNaN(Number(pageNumber))) {
        req.query.pageNumber = '1'
    }

    if (Number(pageNumber) < 0) {
        req.query.pageNumber = '1'
    }

    next()
}

const pageSizeValidation = (req: Request, res: Response, next: NextFunction) => {

    const pageSize = req.query.pageSize

    if (!pageSize) {
        req.query.pageSize = '10'
    }

    if (isNaN(Number(pageSize))) {
        req.query.pageSize = '10'
    }

    if (Number(pageSize) < 0) {
        req.query.pageSize = '10'
    }

    next()
}

export const queryValidationMiddleware = [sortByValidation, sortDirectionValidation, pageNumberValidation, pageSizeValidation]