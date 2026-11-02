import { Source } from '../../../types/news';
import './sources.css';

class Sources {
    draw(data: Array<Source>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');
        if (!sourceItemTemp) return;
        data.forEach((item) => {
            const sourceClone = document.importNode(sourceItemTemp.content, true);

            const nameItem = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
            if (!nameItem || !sourceItem) {
                throw new Error('Отсутствуют обязательные элементы шаблона источника');
            }

            nameItem.textContent = item.name;
            sourceItem.dataset.sourceId = item.id;

            fragment.append(sourceClone);
        });

        const element = document.querySelector<HTMLElement>('.sources');
        if (element) {
            element.append(fragment);
        }
    }
}

export default Sources;
