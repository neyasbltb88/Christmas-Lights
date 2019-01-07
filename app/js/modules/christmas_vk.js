// Импорт главного класса
import ChristmasLights from './christmas_main';

// Класс для работы на странице ВК
export default class ChristmasLightsVK extends ChristmasLights {
    constructor(param) {
        super(param);

    }


    // Вызывает паузу движения и меняет текст в кнопке отключения движения
    pauseRunHandler(e) {
        let res = this.pauseRun();
        let option_name = e.currentTarget.querySelector('.option_name');

        if (res === 'Pause') {
            option_name.textContent = 'Включить движение';
        } else if (res === 'Run') {
            option_name.textContent = 'Отключить движение';
        }

        this.Storage.set('pause_run', this.pause_run);
    }

    // Вызывает паузу анимации и меняет текст в кнопке
    toggleAnimationHandler(e) {
        let res = this.toggleAnimation();
        let option_name = e.currentTarget.querySelector('.option_name');

        if (res === 'Pause') {
            option_name.textContent = 'Включить мерцание';
        } else if (res === 'Run') {
            option_name.textContent = 'Отключить мерцание';
        }

        this.Storage.set('init_animation', this.init_animation);
    }

    // Вызывает удаление/генерацию фонариков и меняет текст в кнопке
    itemsReGenHandler(e) {
        let res = this.itemsReGen();
        let option_name = e.currentTarget.querySelector('.option_name');

        if (res === 'Remove') {
            option_name.textContent = 'Показать фонарики';
        } else if (res === 'Generate') {
            option_name.textContent = 'Убрать фонарики';
        }

        this.Storage.set('show', this.show);
    }

    setAmountHandler() {
        let new_amount = this._set_amount.value;
        this.setAmount(new_amount);

        this.Storage.set('amount', this.amount);
    }

    updateAmountInput(amount) {
        this._set_amount.value = amount;
    }

    // Получает элементы управления
    getControlsElem(elem) {
        // Инпут с количеством фонариков
        this._set_amount = elem.querySelector('._set_amount input');
        this.updateAmountInput(this.amount);
        // Кнопка смены позиции
        this._change_pos = elem.querySelector('._change_pos');

        // Кнопка движения
        this._pause_run = elem.querySelector('._pause_run');
        let _pause_run_text = this._pause_run.querySelector('.option_name');
        _pause_run_text.textContent = (this.pause_run) ? 'Включить движение' : 'Отключить движение';

        // Кнопка анимации
        this._anim_toggle = elem.querySelector('._anim_toggle');
        let _anim_toggle_text = this._anim_toggle.querySelector('.option_name');
        _anim_toggle_text.textContent = (this.init_animation) ? 'Отключить мерцание' : 'Включить мерцание';

        // Кнопка Убрать/Показать фонарики
        this._items_re_gen = elem.querySelector('._items_re_gen');
        let _items_re_gen_text = this._items_re_gen.querySelector('.option_name');
        _items_re_gen_text.textContent = (this.show) ? 'Убрать фонарики' : 'Показать фонарики';
    }

    // Вешает обработчики событий на элементы управления
    initControlsHandlers() {
        // Инпут с количеством фонариков
        this._set_amount.addEventListener('input', this.setAmountHandler.bind(this));
        // Кнопка смены позиции
        this._change_pos.addEventListener('click', this.updatePosition.bind(this));
        // Кнопка движения
        this._pause_run.addEventListener('click', this.pauseRunHandler.bind(this));
        // Кнопка анимации
        this._anim_toggle.addEventListener('click', this.toggleAnimationHandler.bind(this));
        // Кнопка Убрать/Показать фонарики
        this._items_re_gen.addEventListener('click', this.itemsReGenHandler.bind(this));

    }

    // Возвращает шаблон блока управления
    getTemplate() {
        return `
<div class="tt_w tt_default tt_up christmas_controls">
    <div class="wrapped">
        <div class="notify_sources_tt_content christmas_controls_content">
            <div class="content">

                <div class="line_cell clear_fix ui_rmenu_item_sel cur_default _set_amount">
                    <div class="option_name cur_default">Количество фонариков</div>
                    <input class="text ts_input"></input>
                </div>

                <div class="line_cell clear_fix ui_rmenu_item_sel _change_pos">
                  <a class="option_name">Сменить позицию</a>
                </div>

                <div class="line_cell clear_fix ui_rmenu_item_sel _pause_run">
                  <a class="option_name">Отключить движение</a>
                </div>

                <div class="line_cell clear_fix ui_rmenu_item_sel _anim_toggle">
                  <a class="option_name">Отключить мерцание</a>
                </div>

                <div class="line_cell clear_fix ui_rmenu_item_sel _items_re_gen">
                  <a class="option_name">Убрать фонарики</a>
                </div>

            </div>
        </div>
    </div>
</div>`;
    }

    // Создание блока управления
    initControls() {
        let head_nav_btns = document.querySelector('.head_nav_btns');
        let top_notify_btn = document.querySelector('#top_notify_btn');

        if (head_nav_btns && top_notify_btn) {
            let christmas_controls = document.createElement('div');
            christmas_controls.classList.add('christmas-controls', 'top_nav_btn');
            // christmas_controls.textContent = 'Дратути!';

            let controls_light = document.createElement('div');
            controls_light.classList.add('controls_light');
            christmas_controls.appendChild(controls_light);

            let christmas_controls_tt = document.createElement('div');
            christmas_controls_tt.innerHTML = this.getTemplate();
            christmas_controls.appendChild(christmas_controls_tt);

            this.getControlsElem(christmas_controls);
            this.initControlsHandlers(christmas_controls);

            head_nav_btns.insertBefore(christmas_controls, top_notify_btn);
        } else {
            console.log('%c%s', (window.log_color) ? window.log_color.red : '', '*Christmas lights* не удалось создать блок управления');
        }
    }

    initStorage(global_key) {
        if (localStorage.getItem('christmasLights') == null) {
            let start_obj = {
                amount: this.amount,
                pause_run: this.pause_run,
                init_animation: this.init_animation,
                show: this.show
            }

            localStorage.setItem(global_key, JSON.stringify(start_obj));
        }

        this.Storage = {
            set(key, val) {
                let tmp = JSON.parse(localStorage.getItem(global_key));
                tmp[key] = val;
                localStorage.setItem(global_key, JSON.stringify(tmp));

                return tmp;
            },
            get(key) {
                let tmp = JSON.parse(localStorage.getItem(global_key));

                return tmp[key];
            },
            remove(key) {
                let tmp = JSON.parse(localStorage.getItem(global_key));
                delete tmp[key];
                localStorage.setItem(global_key, JSON.stringify(tmp));

                return tmp;
            },
            clear() {
                localStorage.removeItem(global_key);
            }
        }
    }

    restoreSettings() {
        this.amount = this.Storage.get('amount');
        this.pause_run = this.Storage.get('pause_run');
        this.init_animation = this.Storage.get('init_animation');
        this.show = this.Storage.get('show');

        return {
            amount: this.amount,
            pause_run: this.pause_run,
            init_animation: this.init_animation,
            show: this.show
        }
    }


    init() {
        this.initStorage('christmasLights');
        this.restoreSettings();

        super.init();


        // Запуск создания блока управления
        this.initControls();

    }
}