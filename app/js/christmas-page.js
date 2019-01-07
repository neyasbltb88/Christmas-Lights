// Импорт главного класса
import ChristmasLights from './modules/christmas_page';
// Импорт стилей
import { christmas_style_page } from './modules/christmas_style';



// Запуск
console.log('%c%s', (window.log_color) ? window.log_color.purple : '', '*Christmas lights* Запуск рабочего скрипта');

window.christmasLights = new ChristmasLights({
    // Количество фонариков
    amount: 50,
    // Максимальное отклонение от центральной позиции
    deviation: 30,
    // В какой блок вставлять (альфа, сейчас глючит все, кроме body)
    parent: 'body',
    // Инъекция стилей (не трогать)
    style_content: christmas_style_page
});