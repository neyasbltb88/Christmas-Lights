// Стили для основного скрипта
export const christmas_style = `
body {
  position: relative;
  min-width: 100%;
  min-height: 100vh;
  margin: 0;
}

#christmas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -9999;
  overflow: hidden;
}

.christmas-item {
  width: 10px;
  height: 10px;
  position: absolute;
  will-change: transform, opacity;
  border-radius: 50%;
}

.christmas-item_red {

}

.christmas-item_yellow {

}

.christmas-item_green {

}

.christmas-item_blue {

}

.christmas-item:before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  top: 50%;
  left: 50%;
  will-change: transform, opacity;
  transform: translate3d(-50%, -50%, 1px) scale(0);
}

.christmas-item:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 1px);
}

.christmas-item_red:before {
  /* #FA0C00 */
  box-shadow: 0 0 20px 6px rgba(250, 12, 0, 1);
  animation-delay: 0s;
}

.christmas-item_red:after {
  background: #F32613;
}

.christmas-item_yellow:before {
  /* #FAF200 */
  box-shadow: 0 0 20px 6px rgba(250, 242, 0, .8);
  animation-delay: .5s;
}

.christmas-item_yellow:after {
  background: #F0F343;
}

.christmas-item_green:before {
  /* #2AFA00 */
  box-shadow: 0 0 20px 6px rgba(42, 250, 0, .8);
  animation-delay: 1s;
}

.christmas-item_green:after {
  background: #61F351;
}

.christmas-item_blue:before {
  /* #23FFF4 */
  box-shadow: 0 0 20px 8px rgba(35, 255, 244, .6);
  animation-delay: 1.5s;
}

.christmas-item_blue:after {
  background: #89f3ef;
}

.christmas-item-anim:before {
  animation-name: christmas-item-anim;
  animation-duration: 1.7s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes christmas-item-anim {
  0% {
      transform: translate3d(-50%, -50%, 1px) scale(.6);
      opacity: .7;
  }
  50% {
      transform: translate3d(-50%, -50%, 1px) scale(.9);
      opacity: 1;
  }
  100% {
      transform: translate3d(-50%, -50%, 1px) scale(.6);
      opacity: .7;
  }
}
`;

// Стили для запуска на странице ВК
const _style_vk = `
.christmas-controls {
  width: auto;
  min-width: 36px;
  float: left;
  padding: 0 5px !important;
  height: 42px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.christmas_controls .ui_rmenu_item_sel:not(:hover) {
  border-left: 2px solid transparent !important;
  background-color: transparent !important;
}

.christmas_controls .cur_default {
  cursor: default !important;
}

.christmas-controls .christmas_controls {
  border: 1px solid #c5d0db;
  background: #fff;
  position: absolute;
  opacity: 1;
  left: 0px;
  pointer-events: auto;
  box-shadow: 0 0 7px 0px rgba(0, 0, 0, 0.3) !important;
  user-select: none;

  opacity: 0;
  bottom: 0;
  z-index: -99;
  will-change: transform;
  transform: translate3d(0, 0, 1px);
  transition: transform .3s .3s ease-in-out, opacity .2s .3s !important;
}

.christmas-controls:hover .christmas_controls {
  z-index: 1;

  opacity: 1;
  transform: translate3d(0, 100%, 1px);
  transition: transform .3s .3s ease-in-out, opacity .2s .3s, z-index .1s .3s !important;
}

.christmas_controls .christmas_controls_content {
  padding-top: 0;
  padding-bottom: 0;
  min-width: 235px;
  max-height: inherit;
  max-width: 300px;
  overflow: visible !important;
  width: auto!important;
}
.christmas_controls_content .content {
  margin-bottom: -1px;
}
.christmas_controls_content .line_cell {
  padding: 0 15px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.line_cell .option_name {
  flex-grow: 1;
  text-decoration: none;
}
.christmas_controls_content .line_cell:hover,
.christmas_controls_content .line_cell.selected {
  background-color: #e4eaf0;
}

.tt_default.tt_up:before {
  border-width: 6px;
  margin: 0 -6px;
  border-bottom-color: #c5d0db;
}
.tt_default.tt_up:after {
  border-width: 5px;
  margin: 0 -5px;
  border-bottom-color: #fff;
  transform: translate3d(0, 0.5px, 0);
}
.christmas_controls.tt_default.tt_up:after, 
.christmas_controls.tt_default.tt_up:before {
  left: 24px;
}
.tt_w.tt_up:after, .tt_w.tt_up:before {
  bottom: 100%;
}
.tt_w:after, .tt_w:before {
  position: absolute;
  pointer-events: none;
  border: solid transparent;
  content: '';
  height: 0;
  width: 0;
}

.christmas_controls input.text.ts_input {
  padding: 6px 6px 6px 6px;
  background-image: none !important;
  width: 50px;
  margin: 0 0 0 10px;
  border: 1px solid #c5d0db;
  text-align: center;
}

/* Анимация "кнопки настроек" */
.controls_light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
}
.controls_light:before {
  animation-name: christmas-item-anim, controls_light_shadow;
  animation-duration: 1.7s, 8.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.controls_light:after {
  animation-name: controls_light_background;
  animation-duration: 8.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.controls_light:before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
  width: 8px;
  height: 8px;
  top: 50%;
  left: 50%;
  will-change: transform, opacity;
  transform: translate3d(-50%, -50%, 1px) scale(0);
}
.controls_light:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 1px);
}
@keyframes controls_light_background {
  0% {
    background-color: rgba(250, 12, 0, 1);
  }
  25% {
    background-color: rgba(250, 242, 0, .8);
  }
  50% {
    background-color: rgba(42, 250, 0, .8);
  }
  75% {
    background-color: rgba(35, 255, 244, .6);
  }
  100% {
    background-color: rgba(250, 12, 0, 1);
  }
}
@keyframes controls_light_shadow {
  0% {
    box-shadow: 0 0 20px 6px rgba(250, 12, 0, 1);
  }
  25% {
    box-shadow: 0 0 20px 6px rgba(250, 242, 0, .8);
  }
  50% {
    box-shadow: 0 0 20px 6px rgba(42, 250, 0, .8);
  }
  75% {
    box-shadow: 0 0 20px 8px rgba(35, 255, 244, .6);
  }
  100% {
    box-shadow: 0 0 20px 6px rgba(250, 12, 0, 1);
  }
}
`;
export const christmas_style_vk = christmas_style + _style_vk;

// Стили для запуска на простой странице
const _style_page = `
body {
  background-color: rgb(37, 48, 60);
}

.test {
  width: 100%;
  height: 50vh;
  position: relative;
}

.btn_update {
  position: fixed;
  top: 0;
  left: 0;
  color: #ffc000;
  padding: 15px 10px;
  border: 1px solid #ffc000;
  background-color: rgba(37, 48, 60, .7);
  border-radius: 5px;
  cursor: pointer;
  z-index: 99;
  user-select: none;
}
`;
export const christmas_style_page = christmas_style + _style_page;