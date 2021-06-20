import './main-page.scss';

// components
import { MainLayout } from '../../main-layout/main-layout';
import { MainPageSocial } from './components/main-page-social/main-page-social';
import { MainPageLocations } from './components/main-page-locations/main-page-locations';
import { MainPageNavigate } from './components/main-page-navigate/main-page-navigate';

export class MainPage {
  constructor() {
    new MainPageSocial();
    new MainPageLocations();
    new MainPageNavigate();
  }
}

new MainLayout();
new MainPage();
