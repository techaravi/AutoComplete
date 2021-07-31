import "./styles/source.scss"
export class source {
    options: PluginOptions;
    parentElement: HTMLElement;
    dropdownElement: HTMLElement;
    element!: HTMLDivElement;
    search!: HTMLInputElement;
    source!: HTMLUListElement;
    constructor(options: PluginOptions, parent: any) {//autoComplete
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
      this.search.addEventListener("keyup", (e: Event) => { this.search_values(e.target), e.stopPropagation() });
      this.search.addEventListener("click", (e: Event) => e.stopPropagation());

      this.element.appendChild(this.search);

      this.source = document.createElement("ul");
      
      for (var dataIndex = 0; dataIndex < this.options.data.length; dataIndex++) {
        let valueElement: HTMLLIElement = document.createElement("li");
        let elementData:any = this.options.data[dataIndex];

        let valueField = this.options.valueFiled as keyof typeof elementData;
        let displayField = this.options.displayField as keyof typeof elementData;

        let value:any = elementData[valueField];
        let display:any = elementData[displayField];
        valueElement.setAttribute("data-value",value);
        valueElement.setAttribute("data-display", display);

        valueElement.textContent = display;
        if (this.dropdownElement.dataset.value == value) {
          valueElement.setAttribute("class", "active");
        }
        valueElement.addEventListener("click", (e: Event) => this.onSelectValue(e.target));
        this.source.appendChild(valueElement);
      }
      this.element.appendChild(this.source);
      /*if (document.getElementsByClassName("autocomplete-container").length > 0) {
        document.querySelector(".autocomplete-container").remove();
      }*/
      document.getElementsByTagName("body")[0].appendChild(this.element);
      if (this.source.getElementsByClassName("active").length == 1) {
        this.source.getElementsByClassName("active")[0].scrollIntoView();
      } else {
        this.search.focus();
      }

    }
    destroy() {
      var searchCollection = this.source.children;
      for (var index = 0; index < searchCollection.length; index++) {
        //removeEvent(searchCollection[index],"*");
      }
      //removeEvent(context.search,"*");
      this.element.remove();
      this.parentElement.setAttribute("class", "autocomplete");
    }
    onSelectValue(el: any) {
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
    search_values(el: any) {
      let searchstring: string = el.value;
      let searchCollection: any = this.source.children;
      if (searchstring !== "") {
        searchstring = searchstring.toLowerCase();
        for (var index = 0; index < searchCollection.length; index++) {
          var data = searchCollection[index].dataset.display;
          if (data.toString().trim().toLowerCase().indexOf(searchstring) == -1) {
            searchCollection[index].style.display = "none";
          } else {
            searchCollection[index].style.display = "block";
          }
        }
      } else {
        for (var index = 0; index < searchCollection.length; index++) {
          searchCollection[index].style.display = "block";
        }
      }
    }
  }
  
  