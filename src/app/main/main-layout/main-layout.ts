import '../../common/styles/styles.scss';
import './main-layout.scss';

// components
import { MainLayoutHeader } from './components/main-layout-header/main-layout-header';
import { MainLayoutFooter } from './components/main-layout-footer/main-layout-footer';

export class MainLayout {
  constructor() {
    console.log('log-main-layout');
  }
}

new MainLayout();
new MainLayoutHeader();
new MainLayoutFooter();
