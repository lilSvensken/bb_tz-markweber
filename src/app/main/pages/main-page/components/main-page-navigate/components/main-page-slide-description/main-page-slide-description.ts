import './main-page-slide-description.scss';
import { mainLayoutSliderService } from '@common/services/main-layout-slider.service';
import { EventChangeSlideType } from '@common/enums/event-change-slide-type';

export class MainPageSlideDescription {
  constructor(forIndexSlide: number) {
    const hostElem: HTMLElement = document.querySelector(`#main-page-slide-description-${ forIndexSlide }`);

    if (forIndexSlide === 0) {
      hostElem.classList.add('mod-show');
    }

    hostElem.classList.add('mod-on-lift');

    mainLayoutSliderService.changeSlide$
      .subscribe(event => {
        hostElem.classList.remove('mod-show', 'mod-hide', 'mod-on-right', 'mod-on-lift');

        if (event.eventType === EventChangeSlideType.Prev) {
          hostElem.classList.add('mod-on-right');
        } else {
          hostElem.classList.add('mod-on-lift');
        }

        if (event.currentVideoIndex === forIndexSlide) {
          hostElem.classList.add('mod-show');
        } else {
          hostElem.classList.add('mod-hide');
        }
      });
  }
}
