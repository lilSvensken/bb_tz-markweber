import 'styles/styles.scss';
import './main-layout.scss';
import { MainLayoutHeader } from './components/main-layout-header/main-layout-header';
import { MainLayoutFooter } from './components/main-layout-footer/main-layout-footer';
import { MainLayoutSlider } from './components/main-layout-slider/main-layout-slider';

export class MainLayout {
  constructor() {
    new MainLayoutHeader();
    new MainLayoutSlider();
    new MainLayoutFooter();
  }
}
