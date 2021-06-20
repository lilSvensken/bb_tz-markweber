import './main-layout-header.scss';
import { MainLayoutMenuItem } from './components/main-layout-menu-item/main-layout-menu-item';

export class MainLayoutHeader {
  constructor() {
    const menuElemsList = document.querySelectorAll('.main-layout-menu-item-host');
    menuElemsList.forEach((menuElemItem, index) => new MainLayoutMenuItem(index))
  }
}
