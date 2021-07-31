import "./styles/index.scss";
import { source } from "./source";
import { utility } from "./utility";
export class Index {
    constructor(options) {
        this.options = options;
        this.parentElement = this.options.selector;
        this.OnCreate();
        document.addEventListener("click", (e) => {
            if (this.sourceObj != null) {
                this.sourceObj.destroy();
            }
        });
    }
    OnCreate() {
        this.element = document.createElement('div');
        this.element.id = "autocomplete" + new Date().getTime();
        this.element.setAttribute("class", "autocomplete");
        this.parentElement.appendChild(this.element);
        this.dropdownelement = document.createElement('span');
        this.dropdownelement.textContent = this.options.placeholder;
        this.element.appendChild(this.dropdownelement);
        this.arrowElement = document.createElement('div');
        this.arrowElement.setAttribute("class", "arrow");
        this.element.addEventListener("click", (e) => {
            if (utility.hasClass(this.element, "open") == false) {
                this.sourceObj = new source(this.options, this);
            }
            else {
                this.sourceObj.destroy();
            }
            e.stopPropagation();
        });
        this.element.appendChild(this.arrowElement);
    }
    getValue() {
        return this.dropdownelement.dataset.value;
    }
    setValue(value) {
        for (var dataIndex = 0; dataIndex < this.options.data.length; dataIndex++) {
            let elementData = this.options.data[dataIndex];
            let valueField = this.options.valueFiled;
            let displayField = this.options.displayField;
            let elementValue = elementData[valueField];
            let elementDisplay = elementData[displayField];
            if (value == elementValue) {
                this.dropdownelement.setAttribute("data-value", elementValue);
                this.dropdownelement.setAttribute("data-display", elementDisplay);
                this.dropdownelement.textContent = elementDisplay;
                break;
            }
        }
    }
}
//# sourceMappingURL=index.js.map