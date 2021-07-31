import "./styles/index.scss"

import { source } from "./source";
import { utility } from "./utility";

/** Index class */
export class Index {
  options: PluginOptions;
  parentElement: HTMLElement;
  element!: HTMLDivElement;
  dropdownelement!: HTMLSpanElement;
  arrowElement!: HTMLDivElement;
  sourceObj!: source;
  constructor(options: PluginOptions) {
    this.options = options;
    this.parentElement = this.options.selector;
    this.OnCreate();
    document.addEventListener("click", (e: Event) => {
      if (this.sourceObj != null) {
        this.sourceObj.destroy()
      }
    });
  }
  OnCreate() {
    this.element = document.createElement('div') as HTMLDivElement;
    this.element.id = "autocomplete" + new Date().getTime();
    this.element.setAttribute("class", "autocomplete");
    this.parentElement.appendChild(this.element);

    this.dropdownelement = document.createElement('span');
    this.dropdownelement.textContent = this.options.placeholder;
    this.element.appendChild(this.dropdownelement);

    this.arrowElement = document.createElement('div');
    this.arrowElement.setAttribute("class", "arrow");

    this.element.addEventListener("click", (e: Event) => {
      if (utility.hasClass(this.element, "open") == false) {
        this.sourceObj = new source(this.options, this);
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
    for (var dataIndex = 0; dataIndex < this.options.data.length; dataIndex++) {
      let elementData: any = this.options.data[dataIndex];

      let valueField = this.options.valueFiled as keyof typeof elementData;
      let displayField = this.options.displayField as keyof typeof elementData;

      let elementValue: any = elementData[valueField];
      let elementDisplay: any = elementData[displayField];

      if (value == elementValue) {
        this.dropdownelement.setAttribute("data-value", elementValue);
        this.dropdownelement.setAttribute("data-display", elementDisplay);
        this.dropdownelement.textContent = elementDisplay;
        break;
      }
    }

  }
}
