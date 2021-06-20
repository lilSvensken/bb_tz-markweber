import './common-circle-loader.scss';

const DEFAULT_SIZE = 32;
const DEFAULT_WEIGHT = 4;
const DEFAULT_COLOR = '#000';
const DEFAULT_COLOR_SHADOW = 'rgba(0, 0, 0, .2)';
const DEFAULT_FONT_SIZE = 12;
const DEFAULT_PERCENT = 0;

interface InitOptions {
  postfixHostId: string | number; // для точного определения хоста
  size?: number; // размер лоадера (высота и ширина)
  weight?: number; // толщина полоски
  color?: string; // цвет заполненной полоски
  colorShadow?: string; // цвет не заполненной полоски
  fortSize?: number; // размер шрифта процентов
  percent?: number; // проценты
  percentIsVisible?: boolean; // отображать ли проценты
}

export class CommonCircleLoader {
  private _initOptions: InitOptions;
  private _sizePx: string;

  private _hostElem: HTMLElement;
  private _labelElem: HTMLElement;
  private _pieElem: HTMLElement;
  private _halfCircleLeftElem: HTMLElement;
  private _halfCircleRightElem: HTMLElement;
  private _shadowElem: HTMLElement;

  private _percent: number;

  get percent(): number {
    return this._percent;
  }

  set percent(percent: number) {
    if (percent > 100 || percent < 0) {
      percent = 0;
    }

    this._percent = percent;

    this._pieElem.style.clip = this._percent <= 50 ? `rect(0, ${ this._sizePx }, ${ this._sizePx }, ${ this._initOptions.size / 2 }px)` : 'rect(auto, auto, auto, auto)'
    this._halfCircleLeftElem.style.transform = `rotate(${ this._percent * 3.6 }deg)`;
    this._halfCircleRightElem.style.display = this._percent <= 50 ? 'none' : 'initial';
    this._halfCircleRightElem.style.transform = this._percent > 50 ? 'rotate(180deg)' : 'none';

    if (this._initOptions.percentIsVisible) {
      this._labelElem.innerHTML = `${ this._percent.toFixed() || 0 }%`;
    }
  }

  constructor(initOptions: InitOptions) {
    this.initOptions(initOptions);
    this.initElems();

    const size = this._initOptions.size;
    this._sizePx = `${ size }px`;
    const weightPx = `${ this._initOptions.weight }px`;
    const halfCircleClip = `rect(0, ${ size / 2 }px, ${ this._sizePx }, 0)`;

    this._hostElem.style.width = this._sizePx;
    this._hostElem.style.height = this._sizePx;
    this._labelElem.style.fontSize = `${ this._initOptions.fortSize }px`;
    this._halfCircleLeftElem.style.borderWidth = weightPx;
    this._halfCircleLeftElem.style.clip = halfCircleClip;
    this._halfCircleLeftElem.style.borderColor = this._initOptions.color;
    this._halfCircleRightElem.style.borderWidth = weightPx;
    this._halfCircleRightElem.style.clip = halfCircleClip;
    this._halfCircleRightElem.style.borderColor = this._initOptions.color;
    this._shadowElem.style.borderWidth = weightPx;
    this._shadowElem.style.borderColor = this._initOptions.colorShadow;

    this.percent = this._initOptions.percent;
  }

  incPercent(count = 1): void {
    let nextPercent = this._percent + count;
    if (nextPercent > 100) {
      nextPercent = 0;
    }

    this.percent = nextPercent;
  }

  private initElems(): void {
    this._hostElem = document.querySelector(`#common-circle-loader-host-${ this._initOptions.postfixHostId }`);
    this._labelElem = this._hostElem.querySelector('.label');
    this._pieElem = this._hostElem.querySelector('.pie');
    this._halfCircleLeftElem = this._hostElem.querySelector('.half-circle.mod-left-side');
    this._halfCircleRightElem = this._hostElem.querySelector('.half-circle.mod-right-side');
    this._shadowElem = this._hostElem.querySelector('.shadow');
  }

  private initOptions(initOptions: InitOptions): void {
    this._initOptions = {
      postfixHostId: initOptions.postfixHostId,
      size: initOptions.size || DEFAULT_SIZE,
      weight: initOptions.weight || DEFAULT_WEIGHT,
      color: initOptions.color || DEFAULT_COLOR,
      colorShadow: initOptions.colorShadow || DEFAULT_COLOR_SHADOW,
      fortSize: initOptions.fortSize || DEFAULT_FONT_SIZE,
      percent: initOptions.percent || DEFAULT_PERCENT,
      percentIsVisible: initOptions.percentIsVisible ?? false
    }
  }
}
