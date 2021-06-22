import './main-layout-footer.scss';
import { CommonDoubleSlider } from '@common/components/common-double-slider/common-double-slider';

interface ParamsSlider {
  index: number;
  rangeMin: number;
  rangeMax: number;
  step: number;
  start: number[];
}

export class MainLayoutFooter {
  constructor() {
    const hostElem = document.querySelector('#footer-host');
    const inputSquareFrom: HTMLInputElement = hostElem.querySelector('#input-square-from');
    const inputSquareTo: HTMLInputElement = hostElem.querySelector('#input-square-to');
    const inputCostFrom: HTMLInputElement = hostElem.querySelector('#input-cost-from');
    const inputCostTo: HTMLInputElement = hostElem.querySelector('#input-cost-to');
    const selectTitleElem: HTMLInputElement = hostElem.querySelector('#select-title');
    const optionsWrapElem: HTMLInputElement = hostElem.querySelector('#options-wrap');

    const paramsSquareSlider: ParamsSlider = {
      index: 0,
      rangeMin: 0,
      rangeMax: 218,
      step: 1,
      start: [22, 196]
    }

    const paramsCostSlider: ParamsSlider = {
      index: 1,
      rangeMin: 0,
      rangeMax: 20,
      step: 0.1,
      start: [1.5, 18.5]
    }

    this.settingSlider(inputSquareFrom, inputSquareTo, paramsSquareSlider);
    this.settingSlider(inputCostFrom, inputCostTo, paramsCostSlider);

    inputSquareFrom.value = String(paramsSquareSlider.start[0]);
    inputSquareTo.value = String(paramsSquareSlider.start[1]);
    inputCostFrom.value = String(paramsCostSlider.start[0]);
    inputCostTo.value = String(paramsCostSlider.start[1]);

    let isOpenSelectOptions = false;

    selectTitleElem.onclick = () => {
      if (isOpenSelectOptions) {
        optionsWrapElem.classList.remove('mod-show');
      } else {
        optionsWrapElem.classList.add('mod-show');
      }
      isOpenSelectOptions = !isOpenSelectOptions;
    }
  }

  settingSlider(inputFrom: HTMLInputElement, inputTo: HTMLInputElement, paramsSlider: ParamsSlider) {
    const sliderComponent = new CommonDoubleSlider({
      prefixHostId: paramsSlider.index,
      start: paramsSlider.start,
      connect: true,
      range: {
        min: paramsSlider.rangeMin,
        max: paramsSlider.rangeMax
      },
      step: paramsSlider.step,
      animationDuration: 2000
    });

    sliderComponent.updateFrom$
      .subscribe(valueSlider => {
        inputFrom.value = valueSlider;
      });

    sliderComponent.updateTo$
      .subscribe(valueSlider => {
        inputTo.value = valueSlider;
      });

    inputFrom.oninput = () => {
      sliderComponent.onUpdateValueFrom(inputFrom.value);
    }

    inputTo.oninput = () => {
      console.log(1234)
      sliderComponent.onUpdateValueTo(inputFrom.value);
    }
  }
}
