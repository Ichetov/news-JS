export type Source = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type SourcesResponse = {
    status: 'ok';
    sources: Source[];
};

export type ArticleSource = Pick<Source, 'name'> & {
    id: string | null;
};

export type Article = {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
};

export type NewsResponse = {
    status: 'ok';
    totalResults: number;
    articles: Article[];
};

export enum NewsEndpoint {
    Sources = 'sources',
    Everything = 'everything',
}
