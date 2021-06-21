import './main-layout-footer.scss';
import { CommonDoubleSlider } from '@common/components/common-double-slider/common-double-slider';

export class MainLayoutFooter {
  constructor() {
    const hostElem = document.querySelector('#footer-host');
    const inputSquareFrom: HTMLInputElement = hostElem.querySelector('#input-square-from');
    const inputSquareTo: HTMLInputElement = hostElem.querySelector('#input-square-to');
    const inputCostFrom: HTMLInputElement = hostElem.querySelector('#input-cost-from');
    const inputCostTo: HTMLInputElement = hostElem.querySelector('#input-cost-to');

    for (let i = 0; i < 2; i++) {
      let rangeMin: number;
      let rangeMax: number;
      let step: number;
      let start: number[];
      if (i === 0) {
        rangeMin = 0;
        rangeMax = 218;
        step = 1;
        start = [22, 196];
      } else {
        rangeMin = 0;
        rangeMax = 20;
        step = 0.1;
        start = [1.5, 18.5];
      }

      inputSquareFrom.value = String(rangeMin);
      inputSquareTo.value = String(rangeMax);
      inputCostFrom.value = String(rangeMin);
      inputCostTo.value = String(rangeMax);

      const sliderComponent = new CommonDoubleSlider({
        prefixHostId: i,
        start: start,
        connect: true,
        range: {
          min: 0,
          max: rangeMax
        },
        step: step,
        animationDuration: 2000
      });

      sliderComponent.updateFrom$
        .subscribe((w) => {
          if (i === 0) {
            inputSquareFrom.value = w;
          } else {
            inputCostFrom.value = w;
          }
        });

      sliderComponent.updateTo$
        .subscribe((w) => {
          if (i === 0) {
            inputSquareTo.value = w;
          } else {
            inputCostTo.value = w;
          }
        });

      if (i === 0) {
        inputSquareFrom.oninput = () => {
          sliderComponent.onUpdateValueFrom(inputSquareFrom.value);
        }

        inputSquareTo.oninput = () => {
          sliderComponent.onUpdateValueTo(inputSquareFrom.value);
        }
      } else {
        inputCostFrom.oninput = () => {
          sliderComponent.onUpdateValueFrom(inputCostFrom.value);
        }

        inputCostTo.oninput = () => {
          sliderComponent.onUpdateValueTo(inputCostTo.value);
        }
      }
    }
  }
}
