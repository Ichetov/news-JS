import { NewsEndpoint, NewsResponse, SourcesResponse } from '../../types/news';
import AppLoader from './appLoader';

interface AppControllerType {
    getSources: (callback: (data: SourcesResponse) => void) => void;
    getNews: (e: MouseEvent, callback: (data: NewsResponse) => void) => void;
}

class AppController extends AppLoader implements AppControllerType {
    getSources(callback: (data: SourcesResponse) => void): void {
        super.getResp(
            {
                endpoint: NewsEndpoint.Sources,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: (data: NewsResponse) => void): void {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (!(target instanceof Element)) return;
            if (!(newsContainer instanceof HTMLElement)) return;

            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (!sourceId) return;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: NewsEndpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
