// Импорт главного класса
import ChristmasLights from './modules/christmas_vk';

// Импорт стилей
import { christmas_style_vk } from './modules/christmas_style';



// Запуск
// Чтобы не грузилось в iframe
if (window.top === window) {
    requestAnimationFrame(function launch() {
        if (!document.querySelector('.head_nav_btns')) {
            console.log('Шапки еще нет');

            requestAnimationFrame(launch);
        } else {
            console.log('%c%s', (window.log_color) ? window.log_color.purple : '', '*Christmas lights* Запуск рабочего скрипта');

            window.christmasLights = new ChristmasLights({
                // Количество фонариков
                amount: 50,
                // Максимальное отклонение от центральной позиции
                deviation: 30,
                // В какой блок вставлять (альфа, сейчас глючит все, кроме body)
                parent: 'body',
                // Инъекция стилей (не трогать)
                style_content: christmas_style_vk
            });
        }
    })
}