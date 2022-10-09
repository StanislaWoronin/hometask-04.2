export enum SortDescriptionType {
    Ascending = 'asc',
    Distending = 'desc'
}

export enum SortParameters {
    Id = 'id',
    Name = 'name',
    YoutubeUrl = 'youtubeUrl',
    CreatedAt = 'createdAt',
    Title = 'title',
    Content = 'content',
    BlogId = 'blogId',
    BlogName = 'blogName',
}

export type InputQueryParamsType = {
    searchNameTerm: string | null,
    sortBy: string,
    sortDirection: 'asc' | 'desc',
    pageNumber: string,
    pageSize: string,
    blogId: string
}
