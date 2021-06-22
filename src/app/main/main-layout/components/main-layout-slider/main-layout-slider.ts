import './main-layout-slider.scss';
import { Subject } from 'rxjs';
import { mainLayoutSliderService } from '@common/services/main-layout-slider.service';
import { debounceTime } from 'rxjs/operators';
import { EventChangeSlideType } from '@common/enums/event-change-slide-type';
import { EventChangeSlide } from '@common/interfaces/event-change-slide';

enum ModClassSlide {
  Switching = 'mod-switching',
  MoveToRight = 'mod-move-to-right',
  MoveToLeft = 'mod-move-to-left',
  UpperState = 'mod-upper-stated',
  LowerState = 'mod-lower-stated'
}

const TRANSITION_DURATION_SLIDE_NEXT = 800;
const TRANSITION_DURATION_SLIDE_PREV = 300;

const ALL_MOD_CLASSES_FOR_SLIDE = [
  ModClassSlide.Switching,
  ModClassSlide.MoveToRight,
  ModClassSlide.MoveToLeft,
  ModClassSlide.UpperState,
  ModClassSlide.LowerState
]

export class MainLayoutSlider {
  private _hostElem: HTMLElement;
  private readonly _videoWrapElemList: NodeList;
  private readonly _videoElemList: NodeList;
  private _windowOnresize$ = new Subject<void>();

  constructor() {
    this._hostElem = document.querySelector('#main-layout-slider-host');
    this._videoWrapElemList = this._hostElem.querySelectorAll('.video-wrap');
    this._videoElemList = this._hostElem.querySelectorAll('.video');
    this._videoElemList = this._hostElem.querySelectorAll('.video');

    this.setSizeVideoElems();

    mainLayoutSliderService.countSlides = this._videoWrapElemList.length;
    mainLayoutSliderService.changeSlide$.subscribe(event => this.switchSlide(event));

    this._windowOnresize$
      .pipe(debounceTime(300))
      .subscribe(() => this.setSizeVideoElems());

    window.addEventListener('resize', () => this._windowOnresize$.next());
  }

  private switchSlide(event: EventChangeSlide): void {
    let prevVideoCurrentIndex = event.eventType === EventChangeSlideType.Prev
      ? event.currentVideoIndex + 1
      : event.currentVideoIndex - 1;

    if (prevVideoCurrentIndex > this._videoElemList.length - 1) {
      prevVideoCurrentIndex = 0;
    }

    if (prevVideoCurrentIndex < 0) {
      prevVideoCurrentIndex = this._videoElemList.length - 1;
    }

    mainLayoutSliderService.setSwitching(true);
    this._videoWrapElemList.forEach((videoElem: HTMLElement, index) => {
      videoElem.classList.remove(...ALL_MOD_CLASSES_FOR_SLIDE);

      if (event.eventType === EventChangeSlideType.Next) {
        switch (index) {
          case event.currentVideoIndex:
            videoElem.classList.add(ModClassSlide.Switching, ModClassSlide.MoveToLeft);

            setTimeout(() => {
              videoElem.classList.remove(ModClassSlide.Switching, ModClassSlide.MoveToLeft);
              videoElem.classList.add(ModClassSlide.UpperState);
            }, TRANSITION_DURATION_SLIDE_NEXT);
            break;

          case prevVideoCurrentIndex:
            videoElem.classList.add(ModClassSlide.LowerState);

            setTimeout(() => videoElem.classList.remove(ModClassSlide.LowerState), TRANSITION_DURATION_SLIDE_NEXT);
            break;
        }
      } else {
        switch (index) {
          case event.currentVideoIndex:
            videoElem.classList.add(ModClassSlide.LowerState);

            setTimeout(() => {
              videoElem.classList.remove(ModClassSlide.LowerState);
              videoElem.classList.add(ModClassSlide.UpperState);
            }, TRANSITION_DURATION_SLIDE_PREV);
            break;

          case prevVideoCurrentIndex:
            videoElem.classList.add(ModClassSlide.Switching, ModClassSlide.MoveToRight);

            setTimeout(() => {
              videoElem.classList.remove(ModClassSlide.Switching, ModClassSlide.MoveToRight);
            }, TRANSITION_DURATION_SLIDE_PREV);
            break;
        }
      }
    });

    const interval = event.eventType === EventChangeSlideType.Next ? TRANSITION_DURATION_SLIDE_NEXT : TRANSITION_DURATION_SLIDE_PREV;
    setTimeout(() => mainLayoutSliderService.setSwitching(false), interval);
  }

  private setSizeVideoElems(): void {
    this._videoElemList.forEach((videoElem: HTMLVideoElement) => {
      const ratioWidth = videoElem.clientWidth / innerWidth;
      const ratioHeight = videoElem.clientHeight / innerHeight;

      if (ratioWidth >= ratioHeight) {
        videoElem.style.height = '100%';
        videoElem.style.width = 'auto';
      } else {
        videoElem.style.height = 'auto';
        videoElem.style.width = '100%';
      }
    });
  }
}
