import './common-select.scss';
import { OptionsSelect } from '@common/interfaces/options-select';
import { checkExistParent } from '@common/utils/check-exist-parent.utils';

export class CommonSelect {
  hostElem: HTMLElement;
  selectTitleElem: HTMLElement;
  optionsWrapElem: HTMLElement;
  inputsOption: NodeList;

  constructor(selectTitle: string, options: OptionsSelect[]) {
    this.hostElem = document.querySelector('#common-select-host');
    this.selectTitleElem = this.hostElem.querySelector('#select-title');
    this.optionsWrapElem = this.hostElem.querySelector('#options-wrap');

    this.setElems(selectTitle, options);

    this.inputsOption.forEach(inputItem => {
      // @ts-ignore
      inputItem.onclick = () => {
        // @ts-ignore
        this.selectTitleElem.innerText = inputItem.value;
      }
    })

    let isShowOptions = false;

    window.addEventListener('click', event => {
      if (isShowOptions) {
        this.optionsWrapElem.classList.remove('mod-show');
      } else if (checkExistParent(event.target, this.selectTitleElem)) {
        this.optionsWrapElem.classList.add('mod-show');
      }

      isShowOptions = !isShowOptions;
    })
  }

  setElems(selectTitle: string, options: OptionsSelect[]): void {
    this.selectTitleElem.innerText = selectTitle;

    options.forEach(optionItem => {
      this.optionsWrapElem.innerHTML += `
      <label class="common-select option-item">
        <input type="radio" value="${ optionItem.value }" class="input-option">
        <span class="option-item-content">${ optionItem.name }</span>
      </label>
      `;
    })

    this.inputsOption = this.hostElem.querySelectorAll('.input-option');
  }
}
