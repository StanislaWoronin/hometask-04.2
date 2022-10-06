import {blogsType} from "./types/blogs-type";
import {postsType} from "./types/posts-type";
import {pagesCount, totalCount} from "./helperFunctions";

export const paginationContentPage = (sortBy: string,
                                      sortDirection: string,
                                      pageNumber: string,
                                      pageSize: string,
                                      items: blogsType | postsType) => {
    const pageWithContent = {
        "pagesCount": pagesCount(pageSize, items),
        "page": Number(pageNumber),
        "pageSize": Number(pageSize),
        "totalCount": totalCount(items),
        "items": items
    }

    return pageWithContent
}