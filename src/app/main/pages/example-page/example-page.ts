import './example-page.scss';
import { DynamicTemplateUtils } from '../../../common/utils/dynamic-template.utils';

export class ExamplePage {
  constructor() {
    DynamicTemplateUtils.create(
      [{ name: 'name1', age: 10 }, { name: 'name2', age: 14 }],
      'example-page-example-api-items-container',
      require('./components/main-page-example-api-items/main-page-example-api-items.hbs')
    )
  }
}

new ExamplePage();
