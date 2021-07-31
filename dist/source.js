import "./styles/source.scss";
export class source {
    constructor(options, parent) {
        this.options = options;
        this.parentElement = parent.element;
        this.dropdownElement = parent.dropdownelement;
        this.OnCreate();
    }
    OnCreate() {
        this.parentElement.setAttribute("class", "autocomplete open");
        this.element = document.createElement('div');
        this.element.id = this.parentElement.id + "source";
        this.element.setAttribute("class", "autocomplete-container");
        var top = (this.parentElement.offsetTop + this.parentElement.offsetHeight) + "px";
        this.element.setAttribute("style", "top:" + top);
        this.search = document.createElement("input");
        this.search.setAttribute("class", "search");
        this.search.addEventListener("keyup", (e) => { this.search_values(e.target), e.stopPropagation(); });
        this.search.addEventListener("click", (e) => e.stopPropagation());
        this.element.appendChild(this.search);
        this.source = document.createElement("ul");
        for (var dataIndex = 0; dataIndex < this.options.data.length; dataIndex++) {
            let valueElement = document.createElement("li");
            let elementData = this.options.data[dataIndex];
            let valueField = this.options.valueFiled;
            let displayField = this.options.displayField;
            let value = elementData[valueField];
            let display = elementData[displayField];
            valueElement.setAttribute("data-value", value);
            valueElement.setAttribute("data-display", display);
            valueElement.textContent = display;
            if (this.dropdownElement.dataset.value == value) {
                valueElement.setAttribute("class", "active");
            }
            valueElement.addEventListener("click", (e) => this.onSelectValue(e.target));
            this.source.appendChild(valueElement);
        }
        this.element.appendChild(this.source);
        document.getElementsByTagName("body")[0].appendChild(this.element);
        if (this.source.getElementsByClassName("active").length == 1) {
            this.source.getElementsByClassName("active")[0].scrollIntoView();
        }
        else {
            this.search.focus();
        }
    }
    destroy() {
        var searchCollection = this.source.children;
        for (var index = 0; index < searchCollection.length; index++) {
        }
        this.element.remove();
        this.parentElement.setAttribute("class", "autocomplete");
    }
    onSelectValue(el) {
        var selectedValue = el.dataset.value;
        var selectedText = el.dataset.display;
        this.dropdownElement.setAttribute("data-value", selectedValue);
        this.dropdownElement.setAttribute("data-display", selectedText);
        this.dropdownElement.textContent = selectedText;
        this.destroy();
        if (this.options.onSelect != null) {
            this.options.onSelect(selectedText, selectedValue);
        }
    }
    search_values(el) {
        let searchstring = el.value;
        let searchCollection = this.source.children;
        if (searchstring !== "") {
            searchstring = searchstring.toLowerCase();
            for (var index = 0; index < searchCollection.length; index++) {
                var data = searchCollection[index].dataset.display;
                if (data.toString().trim().toLowerCase().indexOf(searchstring) == -1) {
                    searchCollection[index].style.display = "none";
                }
                else {
                    searchCollection[index].style.display = "block";
                }
            }
        }
        else {
            for (var index = 0; index < searchCollection.length; index++) {
                searchCollection[index].style.display = "block";
            }
        }
    }
}
//# sourceMappingURL=source.js.map