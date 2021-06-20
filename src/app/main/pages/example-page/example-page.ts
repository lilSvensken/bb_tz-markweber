import './example-page.scss';
import { DynamicTemplateUtils } from '@common/utils/dynamic-template.utils';

// components
import { ExamplePageApiItems } from './components/example-page-api-items/example-page-api-items';
import { ExamplePageItem } from './components/example-page-item/example-page-item';
import { CommonCircleLoader } from '@common/components/common-circle-loader/common-circle-loader';

export class ExamplePage {
  private _loaderComponent: CommonCircleLoader;

  constructor() {
    DynamicTemplateUtils.create(
      [{ name: 'name1', age: 10 }, { name: 'name2', age: 14 }],
      'example-page-example-api-items-container',
      require('./components/example-page-api-items/example-page-api-items.hbs')
    );

    this._loaderComponent = new CommonCircleLoader({ postfixHostId: 2, percentIsVisible: true });
    setInterval(() => this._loaderComponent.incPercent(1), 100);
  }
}

new ExamplePage();
new ExamplePageApiItems();
new ExamplePageItem();
