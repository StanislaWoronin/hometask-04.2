export type PostType = {
    id: string,
    title: string,
    sortDescription: 'asc' | 'desc',
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type PostsType = PostType[]