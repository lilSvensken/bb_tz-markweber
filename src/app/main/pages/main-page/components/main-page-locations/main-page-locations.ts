import './main-page-locations.scss';
import { MainPageLocationDescription } from './components/main-page-location-description/main-page-location-description';
import { mainLayoutService } from '@common/services/main-layout.service';

export class MainPageLocations {
  private readonly _hostElem = document.querySelector('#main-page-locations-host');
  private readonly _locationLinkElemsList = this._hostElem.querySelectorAll('.location-item');
  private readonly _locationDescriptionComponentsList: MainPageLocationDescription[] = [];

  constructor() {
    this._locationLinkElemsList.forEach((locationLinkElem, index) => {
      this._locationDescriptionComponentsList[index] = new MainPageLocationDescription(index);
      (locationLinkElem as HTMLElement).onmouseenter = () => {
        mainLayoutService.setIsShading(true);
        this._locationDescriptionComponentsList[index].show();
      }

      (locationLinkElem as HTMLElement).onmouseleave = () => {
        mainLayoutService.setIsShading(false);
        this._locationDescriptionComponentsList[index].hide();
      }
    });
  }
}
