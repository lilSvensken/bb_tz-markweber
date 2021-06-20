import { Subject } from 'rxjs';
import { EventChangeSlideType } from '@common/enums/event-change-slide-type';
import { EventChangeSlide } from '@common/interfaces/event-change-slide';

export class MainLayoutSliderService {
  private readonly _changeSlide$ = new Subject<EventChangeSlide>();
  private _currentVideoIndex = 0;
  private _countSlides = 0;
  private _isSwitching = false;

  readonly changeSlide$ = this._changeSlide$.asObservable();

  set countSlides(countSlides: number) {
    this._countSlides = countSlides;
  }

  prevSlide(): void {
    if (!this._isSwitching && this._countSlides) {
      this.changeSlide(EventChangeSlideType.Prev);
    }
  }

  nextSlide(): void {
    if (!this._isSwitching && this._countSlides) {
      this.changeSlide(EventChangeSlideType.Next);
    }
  }

  setSwitching(isSwitching: boolean): void {
    this._isSwitching = isSwitching;
  }

  private changeSlide(eventType: EventChangeSlideType) {
    this.defineCurrentVideoIndexByEvent(eventType);
    this._changeSlide$.next({
      eventType,
      currentVideoIndex: this._currentVideoIndex
    });
  }

  private defineCurrentVideoIndexByEvent(event: EventChangeSlideType): void {
    if (event === EventChangeSlideType.Prev) {
      if (this._currentVideoIndex > 0) {
        this._currentVideoIndex--;
      } else {
        this._currentVideoIndex = this._countSlides - 1;
      }
    } else {
      if (this._currentVideoIndex < this._countSlides - 1) {
        this._currentVideoIndex++;
      } else {
        this._currentVideoIndex = 0;
      }
    }
  }
}

export const mainLayoutSliderService = new MainLayoutSliderService();
