import {blogsType} from "./types/blogs-type";
import {postsType} from "./types/posts-type";

export const giveSkipNumber = (pageNumber: string,
                               pageSize: string) => {

    return (Number(pageNumber) - 1) * Number(pageSize)
}

export const totalCount = (items: blogsType | postsType) => {
    return items.length
}

export const pagesCount = (pageSize: string, items: blogsType | postsType) => {
    return Math.ceil(items.length / Number(pageSize))
}

