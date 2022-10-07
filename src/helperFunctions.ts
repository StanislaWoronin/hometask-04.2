import {blogsRepository} from "./repositories/blogs-repository";

export const giveSkipNumber = (pageNumber: string,
                               pageSize: string) => {

    return (Number(pageNumber) - 1) * Number(pageSize)
}

export const totalCount = async (searchNameTerm: string | null) => {
    return await blogsRepository.giveTotalCount(searchNameTerm)
}

export const givePagesCount = (totalCount: number, pageSize: string) => {
    return Math.ceil(totalCount / Number(pageSize))
}

