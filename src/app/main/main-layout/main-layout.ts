import 'styles/styles.scss';
import './main-layout.scss';
import { MainLayoutHeader } from './components/main-layout-header/main-layout-header';
import { MainLayoutFooter } from './components/main-layout-footer/main-layout-footer';
import { MainLayoutSlider } from './components/main-layout-slider/main-layout-slider';
import { mainLayoutService } from '@common/services/main-layout.service';

export class MainLayout {
  private readonly _hostElem = document.querySelector('#main-layout-host');

  constructor() {
    mainLayoutService.isShading$
      .subscribe(isShading => {
        if (isShading) {
          this._hostElem.classList.add('mod-shading');
        } else {
          this._hostElem.classList.remove('mod-shading');
        }
      })
    new MainLayoutHeader();
    new MainLayoutSlider();
    new MainLayoutFooter();
  }
}
