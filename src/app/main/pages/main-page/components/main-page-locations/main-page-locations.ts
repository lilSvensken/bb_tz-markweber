import './main-page-locations.scss';
import { MainPageLocationDescription } from './components/main-page-location-description/main-page-location-description';
import { mainLayoutService } from '@common/services/main-layout.service';

export class MainPageLocations {
  constructor() {
    const hostElem = document.querySelector('#main-page-locations-host');
    const locationLinkElemsList = hostElem.querySelectorAll('.location-item');
    locationLinkElemsList.forEach((locationLinkElem, index) => {
      const mainPageLocationDescriptionComponent = new MainPageLocationDescription(index);
      (locationLinkElem as HTMLElement).onmouseenter = () => {
        mainLayoutService.setIsShading(true);
        mainPageLocationDescriptionComponent.show();
      }

      (locationLinkElem as HTMLElement).onmouseleave = () => {
        mainLayoutService.setIsShading(false);
        mainPageLocationDescriptionComponent.hide();
      }
    });
  }
}
