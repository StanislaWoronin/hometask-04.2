import {blogsType} from "./types/blogs-type";
import {postsType} from "./types/posts-type";
import {givePagesCount} from "./helperFunctions";

export const paginationContentPage = (pageNumber: string,
                                      pageSize: string,
                                      content: blogsType | postsType,
                                      totalCount: number) => {

    const pageWithContent = {
        "pagesCount": givePagesCount(totalCount, pageSize),
        "page": Number(pageNumber),
        "pageSize": Number(pageSize),
        "totalCount": totalCount,
        "items": content
    }

    return pageWithContent
}