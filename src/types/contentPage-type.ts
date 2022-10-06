import {blogsType} from "./blogs-type";
import {postsType} from "./posts-type";

export type contentPageType = {
    pagesCount: number, // всего страниц
    page: number, // номер страницы
    pageSize: number, // количество элементов на странице
    totalCount: number, // всего элементов
    items: blogsType | postsType
}