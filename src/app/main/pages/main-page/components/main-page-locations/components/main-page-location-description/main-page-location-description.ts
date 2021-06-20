import './main-page-location-description.scss';

export class MainPageLocationDescription {
  private readonly _hostElem: HTMLElement;

  constructor(prefixHostId: number) {
    this._hostElem = document.querySelector(`#location-description-host-${ prefixHostId }`);
  }

  show(): void {
    this._hostElem.classList.add('mod-show');
  }

  hide(): void {
    this._hostElem.classList.remove('mod-show');
  }
}
