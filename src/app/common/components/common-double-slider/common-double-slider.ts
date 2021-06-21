import './common-double-slider.scss';
import 'nouislider/dist/nouislider.css';
import { BehaviorSubject, Subject } from 'rxjs';
import noUiSlider, { API } from 'nouislider';
import { Options } from 'nouislider/src/nouislider';
import { distinctUntilChanged, filter, shareReplay } from 'rxjs/operators';

interface InitOptions extends Options {
  prefixHostId: number;
}

export class CommonDoubleSlider {
  private readonly _updateFrom$ = new BehaviorSubject<string>(null);
  private readonly _updateTo$ = new BehaviorSubject<string>(null);

  private slider: API;

  readonly updateFrom$ = this._updateFrom$
    .pipe(
      filter(value => !!value),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  readonly updateTo$ = this._updateTo$
    .pipe(
      filter(value => !!value),
      distinctUntilChanged(),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  constructor(initOptions: InitOptions) {
    const hostElem: HTMLElement = document.querySelector(`#common-double-slider-host-${ initOptions.prefixHostId }`);
    this.slider = noUiSlider.create(hostElem, initOptions);

    this.slider.on('set', () => {
      const sliderValue = this.slider.get() as string[];
      this._updateFrom$.next(sliderValue[0]);
      this._updateTo$.next(sliderValue[1]);
    });
  }

  onUpdateValueFrom(value: string): void {
    this._updateFrom$.next(value);
    this.slider.set([value, this._updateTo$.value]);
  }

  onUpdateValueTo(value: string): void {
    this._updateTo$.next(value);
    this.slider.set([this._updateFrom$.value, value]);
  }
}
