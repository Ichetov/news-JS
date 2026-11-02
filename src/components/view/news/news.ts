import type { Article } from '../../../types/news';
import './news.css';

class News {
    draw(data: Article[]): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();

        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        const newsContainer = document.querySelector<HTMLElement>('.news');

        if (!newsItemTemp || !newsContainer) {
            throw new Error('Шаблон или контейнер новостей не найден');
        }

        news.forEach((item, idx) => {
            const newsClone = document.importNode(newsItemTemp.content, true);

            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            const date = newsClone.querySelector<HTMLElement>('.news__meta-date');
            const title = newsClone.querySelector<HTMLElement>('.news__description-title');
            const source = newsClone.querySelector<HTMLElement>('.news__description-source');
            const content = newsClone.querySelector<HTMLElement>('.news__description-content');
            const link = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');

            if (!newsItem || !photo || !author || !date || !title || !source || !content || !link) {
                throw new Error('Отсутствует обязательный элемент шаблона новости');
            }

            if (idx % 2 !== 0) {
                newsItem.classList.add('alt');
            }

            photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            author.textContent = item.author || item.source.name;

            date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            title.textContent = item.title;
            source.textContent = item.source.name;
            content.textContent = item.description ?? '';

            link.href = item.url;

            fragment.append(newsClone);
        });

        newsContainer.replaceChildren(fragment);
    }
}

export default News;
