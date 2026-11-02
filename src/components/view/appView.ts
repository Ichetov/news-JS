import { NewsResponse, SourcesResponse } from '../../types/news';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsResponse): void {
        this.news.draw(data.articles);
    }

    public drawSources(data: SourcesResponse): void {
        this.sources.draw(data.sources);
    }
}

export default AppView;
