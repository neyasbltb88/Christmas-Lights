/* Christmas lights */
export default class ChristmasLights {
    constructor(settings = {}) {
        // Классы для цветов фонариков
        this.color_classes = {
            red: 'christmas-item_red',
            yellow: 'christmas-item_yellow',
            green: 'christmas-item_green',
            blue: 'christmas-item_blue'
        };

        // Общее количество фонариков
        this.amount = settings.amount || 40;
        // Количество фонариков каждого цвета
        this.color_amount = {};
        // Максимальное отклонение фонариков от базовой позиции
        this.deviation = settings.deviation || 10

        // Селектор блока, в котором будет создаваться контейнер
        this.parent = document.querySelector(settings.parent) || document.querySelector('body');
        // Переменная, содержащая в себе текстовый контент стилей
        this.style_content = settings.style_content;
        // Контейнер, в котором будут создаваться фонарики
        this.container = document.createElement('div');
        // Размеры контейнера
        this.container_size = {
            x: 0,
            y: 0
        }

        // Массив созданных элементов-фонариков
        this.buffer = [];
        // Флаг паузы движения
        this.pause_run = false;
        // Флаг запущенной анимации мерцания
        this.init_animation = true;
        // Флаг показа фонариков
        this.show = true;


        // Точка входа
        this.init();
    }

    // Возвращает рандомное число в указанных границах
    rand(min, max) {
        let rand = Math.floor(min + Math.random() * (max + 1 - min));
        if (rand === 0) {
            rand++;
        }
        return rand;
    }

    // Вставка стилей внутрь контейнера
    styleInject(style_content, elem, id) {
        const stl = document.createElement('style');
        stl.id = id;
        stl.textContent = style_content;
        elem.appendChild(stl);
    }

    // Установка нового количества фонариков
    setAmount(new_amount) {
        new_amount = (new_amount < 0) ? 0 : new_amount;
        new_amount = (new_amount > 1000) ? 1000 : new_amount;
        this.amount = +new_amount;
        this.computeAmount(this.amount);

        this.itemsRemover();
        this.itemsReGen();
    }

    // Вкл/выкл анимации мерцания
    toggleAnimation(flag) {
        if (typeof flag === 'boolean') {
            this.init_animation = flag;
        } else {
            this.init_animation = !this.init_animation;
        }

        if (this.init_animation) {
            this.buffer.forEach((item) => this.initAnimation(item));

            return 'Run';
        } else {
            this.buffer.forEach((item) => this.removeAnimation(item));

            return 'Pause';
        }
    }

    // Удалить анимацию мерцания
    removeAnimation(item) {
        requestAnimationFrame(() => item.elem.classList.remove('christmas-item-anim'));
        this.init_animation = false;
    }

    // Добавить анимацию мерцания
    initAnimation(item) {
        requestAnimationFrame(() => item.elem.classList.add('christmas-item-anim'));
        this.init_animation = true;
    }

    // Первый звпуск движения всех фонариков
    firstRun() {
        setTimeout(() => {
            this.buffer.forEach((item, index) => {
                item.x = 0;
                item.y = 0;
                requestAnimationFrame(() => this.runItem(index))
            })
        }, 500);
    }

    // Запускает движение фонарика
    runItem(index) {
        let item = this.buffer[index];

        if (item) {
            let x = item.x + this.rand(-4, 4);
            let y = item.y + this.rand(-4, 4);

            x = (x < (0 - this.deviation)) ? 0 : (x > this.deviation) ? 0 : x;
            y = (y < (0 - this.deviation)) ? 0 : (y > this.deviation) ? 0 : y;

            this.buffer[index].x = x;
            this.buffer[index].y = y;

            let transform_duration = this.rand(1500, 2500);
            this.buffer[index].elem.style.transition = `transform ${transform_duration}ms ease-in-out, top ${transform_duration}ms ease-in-out, left ${transform_duration}ms ease-in-out`;
            this.buffer[index].elem.style.transform = `translate3d(${x}px, ${y}px, 1px)`;
        }
    }

    // Метод для остановки/возобновления движения фонариков
    pauseRun(flag) {
        if (typeof flag === 'boolean') {
            this.pause_run = flag;
        } else {
            this.pause_run = !this.pause_run;
        }

        if (!this.pause_run) {
            this.firstRun();
            this.pause_run = false;

            return 'Run';
        }

        this.pause_run = true;

        return 'Pause';
    }

    // Инициализация движения фонариков и слушателя его окончания
    initRun() {
        this.container.addEventListener('transitionend', e => {
            if (e.propertyName === 'transform' && !this.pause_run) {
                // console.log(e.propertyName);
                this.runItem(Number(e.target.dataset.christmasItem));
            }
        });
    }

    // Меняет положение всех фонариков
    updatePosition() {
        this.container_size.x = window.innerWidth;
        this.container_size.y = window.innerHeight;
        this.buffer.forEach(item => this.setPosition(item))
    }

    // Задает позицию фонарика
    setPosition(item) {
        requestAnimationFrame(() => {
            item.elem.style.top = this.rand(0 + 15, this.container_size.y - 15) + 'px';
            item.elem.style.left = this.rand(0 + 15, this.container_size.x - 15) + 'px';
        })
    }

    // Вставка фонарика в контейнер
    appendItem(elem) {
        requestAnimationFrame(() => this.container.appendChild(elem))
    }

    // Генерация фонариков
    itemsGenerator() {
        let item_index = 0;
        for (let color in this.color_amount) {
            let amount = this.color_amount[color];

            for (let i = 0; i < amount; i++) {
                let item = {
                    x: 0,
                    y: 0
                };
                let elem = document.createElement('div');
                elem.classList.add('christmas-item', this.color_classes[color]);
                elem.dataset.christmasItem = item_index;

                let transform_duration = this.rand(1500, 2500);
                elem.style.transition = `transform ${transform_duration}ms ease-in-out, top ${transform_duration}ms ease-in-out, left ${transform_duration}ms ease-in-out`;

                item.elem = elem;
                this.setPosition(item);

                this.buffer[item_index] = item;
                this.appendItem(elem);

                item_index++;
            }
        }

        this.show = true;
    }

    // Удаляет все фонарики из контейнера
    itemsRemover() {
        this.buffer.forEach((item) => {
            requestAnimationFrame(() => this.container.removeChild(item.elem))
        })

        this.buffer = [];
        this.show = false;
    }

    // Заново генерирует фонарики после удаления
    itemsReGen() {
        if (this.show === false) {
            // Генерируем фонарики
            this.itemsGenerator();

            // И запускаем первое движение
            if (!this.pause_run) {
                this.firstRun();
            }

            // Запускаем анимацию мерцания
            if (this.init_animation) {
                this.toggleAnimation(true);
            }

            return 'Generate';
        } else {
            this.itemsRemover();

            return 'Remove';
        }
    }

    // Расчет размеров контейнера
    computeContainerSize() {
        this.container_size.x = window.innerWidth;
        this.container_size.y = window.innerHeight;
    }

    // Инициализация контейнера
    initContainer() {
        this.container.id = 'christmas-container';
        this.styleInject(this.style_content, this.container, 'christmas-style');
        this.parent.appendChild(this.container);
    }

    // Расчет количества фонариков каждого цвета
    computeAmount(amount) {
        this.color_amount = {
            red: Math.floor(amount / 4),
            yellow: Math.floor(amount / 4),
            green: Math.floor(amount / 4),
            blue: amount - (Math.floor(amount / 4) * 3)
        }
    }

    init() {
        this.computeAmount(this.amount);

        this.computeContainerSize();

        this.initContainer();

        // Генерируем фонарики
        if (this.show) {
            this.itemsGenerator();
        }

        // После генерации всех фонариков вешаем на контейнер слушатель transitionend
        this.initRun();

        // И запускаем первое движение
        if (!this.pause_run) {
            this.firstRun();
        }


        // Запускаем анимацию мерцания
        if (this.init_animation) {
            this.toggleAnimation(true);
        }

    }
}