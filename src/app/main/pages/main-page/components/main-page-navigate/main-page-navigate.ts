import './main-page-navigate.scss';
import { CommonCircleLoader } from '@common/components/common-circle-loader/common-circle-loader';
import { mainLayoutSliderService } from '@common/services/main-layout-slider.service';
import { interval } from 'rxjs';

export class MainPageNavigate {
  private _loaderComponent: CommonCircleLoader;

  private _hostElem: HTMLElement;
  private _btnNextElem: HTMLElement;
  private _btnPrevElem: HTMLElement;

  constructor() {
    this.initElems();

    this._loaderComponent = new CommonCircleLoader(
      {
        postfixHostId: 1,
        size: 40,
        weight: 1,
        color: 'white',
        colorShadow: 'rgba(255, 255, 255, 0.15)'
      });

    interval(40)
      .subscribe(() => {
        this._loaderComponent.incPercent();
        if (this._loaderComponent.percent === 100) {
          mainLayoutSliderService.nextSlide();
        }
      });

    mainLayoutSliderService.changeSlide$.subscribe(() => this._loaderComponent.percent = 0);

    this._btnNextElem.onclick = () => mainLayoutSliderService.nextSlide();
    this._btnPrevElem.onclick = () => mainLayoutSliderService.prevSlide();
  }

  initElems(): void {
    this._hostElem = document.querySelector('#main-page-navigate-host');
    this._btnNextElem = this._hostElem.querySelector('#btn-next');
    this._btnPrevElem = this._hostElem.querySelector('#btn-prev');
  }
}