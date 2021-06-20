import './main-layout-menu-item.scss';

export class MainLayoutMenuItem {
  constructor(prefixHostId: number) {
    const hostElem: HTMLElement = document.querySelector(`#main-layout-menu-item-host-${ prefixHostId }`);
    hostElem.onmouseenter = () => hostElem.classList.add('mod-anim');
    hostElem.onanimationend = () => hostElem.classList.remove('mod-anim');
  }
}
