// Импорт главного класса
import ChristmasLights from './christmas_main';

// Класс для работы на странице ВК
export default class ChristmasLightsPage extends ChristmasLights {
    constructor(param) {
        super(param);
    }

    // Создание блока управления
    initControls() {
        // Кнопка обновления позиции фонариков
        const btn_update = document.createElement('div');
        btn_update.classList.add('btn_update');
        btn_update.textContent = 'Обновить позицию';

        btn_update.addEventListener('click', () => {
            window.christmasLights.updatePosition();
        })

        document.body.appendChild(btn_update);
    }


    init() {
        super.init();

        // Запуск создания блока управления
        this.initControls();
    }
}