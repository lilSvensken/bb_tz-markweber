import './main-page-navigate.scss';
import { CommonCircleLoader } from '@common/components/common-circle-loader/common-circle-loader';
import { mainLayoutSliderService } from '@common/services/main-layout-slider.service';
import { interval } from 'rxjs';
import { MainPageSlideDescriptionsList } from './components/main-page-slide-descriptions-list/main-page-slide-descriptions-list';

export class MainPageNavigate {
  constructor() {
    new MainPageSlideDescriptionsList();

    const hostElem: HTMLElement = document.querySelector('#main-page-navigate-host');
    const btnNextElem: HTMLElement = hostElem.querySelector('#btn-next');
    const btnPrevElem: HTMLElement = hostElem.querySelector('#btn-prev');
    btnNextElem.onclick = () => mainLayoutSliderService.nextSlide();
    btnPrevElem.onclick = () => mainLayoutSliderService.prevSlide();

    const loaderComponent: CommonCircleLoader = new CommonCircleLoader(
      {
        postfixHostId: 1,
        size: 40,
        weight: 1,
        color: 'white',
        colorShadow: 'rgba(255, 255, 255, 0.15)'
      });

    interval(40)
      .subscribe(() => {
        loaderComponent.incPercent();
        if (loaderComponent.percent === 100) {
          mainLayoutSliderService.nextSlide();
        }
      });

    mainLayoutSliderService.changeSlide$.subscribe(() => loaderComponent.percent = 0);
  }
}
