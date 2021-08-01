import "./index.scss"

import { Source } from "./source";
import { utility } from "./utility";

/** Index class */
export class Index {
  options: PluginOptions;
  element!: HTMLElement;
  dropdownelement!: HTMLSpanElement;
  arrowElement!: HTMLDivElement;
  sourceObj!: Source;
  constructor(options: PluginOptions) {
    this.options = options;
    this.element = this.options.selector;
    this.OnCreate();
    document.addEventListener("click", (e: Event) => {
      if (this.sourceObj != null) {
        this.sourceObj.destroy()
      }
    });
  }
  OnCreate() {
    this.element.classList.add("autocomplete");

    this.dropdownelement = document.createElement('span');
    this.dropdownelement.textContent = this.options.placeholder;
    this.element.appendChild(this.dropdownelement);

    this.arrowElement = document.createElement('div');
    this.arrowElement.classList.add("arrow");

    this.element.addEventListener("click", (e: Event) => {
      if (utility.hasClass(this.element, "open") === false) {
        this.sourceObj = new Source(this.options, this);
      } else {
        this.sourceObj.destroy();
      }
      e.stopPropagation();
    });
    this.element.appendChild(this.arrowElement);

  }
  getValue() {
    return this.dropdownelement.dataset.value;
  }
  setValue(value: string) {
    for (const elementData of this.options.data) {
      const valueField:any = this.options.valueFiled as keyof typeof elementData;
      const displayField:any = this.options.displayField as keyof typeof elementData;

      const elementValue: string = elementData[valueField];
      const elementDisplay: string = elementData[displayField];

      if (value === elementValue.toString()) {
        this.dropdownelement.setAttribute("data-value", elementValue);
        this.dropdownelement.setAttribute("data-display", elementDisplay);
        this.dropdownelement.textContent = elementDisplay;
        break;
      }
    }

  }
}
