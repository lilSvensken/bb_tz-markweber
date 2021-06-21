import './main-page-slide-descriptions-list.scss';
import { MainPageSlideDescription } from './components/main-page-slide-description/main-page-slide-description';
import { mainLayoutSliderService } from '@common/services/main-layout-slider.service';
import { merge, Subject } from 'rxjs';
import { debounceTime, map, withLatestFrom } from 'rxjs/operators';

export class MainPageSlideDescriptionsList {
  private readonly _hostElem: HTMLElement = document.querySelector('#main-page-slide-descriptions-list-host');
  private readonly _slideDescriptionElemsList = this._hostElem.querySelectorAll('.main-page-slide-description');

  private readonly _windowEventResize$ = new Subject<void>();

  constructor() {
    this._slideDescriptionElemsList.forEach((_, index) => new MainPageSlideDescription(index));

    merge(
      mainLayoutSliderService.changeSlide$,
      this._windowEventResize$
        .pipe(
          debounceTime(300),
          withLatestFrom(mainLayoutSliderService.changeSlide$),
          map(([, eventChangeSlide]) => eventChangeSlide)
        )
    )
      .pipe(map(eventChangeSlide => eventChangeSlide.currentVideoIndex))
      .subscribe(currentVideoIndex => this.setHostElemHeight(currentVideoIndex));

    addEventListener('resize', () => this._windowEventResize$.next());

    setTimeout(() => this.setHostElemHeight(0));
  }

  private setHostElemHeight(currentVideoIndex: number): void {
    this._hostElem.style.height = `${ this._slideDescriptionElemsList[currentVideoIndex].clientHeight }px`;
  }
}
