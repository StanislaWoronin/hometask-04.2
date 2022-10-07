import {blogsType} from "./types/blogs-type";
import {postsType} from "./types/posts-type";
import {givePagesCount} from "./helperFunctions";

export const paginationContentPage = (pageNumber: string,
                                      pageSize: string,
                                      content: blogsType | postsType,
                                      pagesCount: number) => {
    const pageWithContent = {
        "pagesCount": pagesCount,
        "page": Number(pageNumber),
        "pageSize": Number(pageSize),
        "totalCount": givePagesCount(pagesCount, pageSize),
        "items": content
    }

    return pageWithContent
}