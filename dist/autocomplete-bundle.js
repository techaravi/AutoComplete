(function ($) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var $__default = /*#__PURE__*/_interopDefaultLegacy($);

    class Source {
      constructor(options, parent) {
        this.options = options;
        this.parentElement = parent.element;
        this.dropdownElement = parent.dropdownelement;

        if (this.options.data.length > 0) {
          this.options.data[0];
          this.valueField = this.options.valueFiled;
          this.displayField = this.options.displayField;
        }

        this.OnCreate();
      }

      OnCreate() {
        this.parentElement.classList.add("open");
        this.element = document.createElement('div');
        this.element.id = this.parentElement.id + "source";
        this.element.classList.add("autocomplete-container");
        const top = this.parentElement.offsetTop + this.parentElement.offsetHeight + "px";
        this.element.setAttribute("style", "top:" + top);
        this.search = document.createElement("input");
        this.search.classList.add("search");
        this.search.addEventListener("keyup", e => {
          this.search_values(e.target), e.stopPropagation();
        });
        this.search.addEventListener("click", e => e.stopPropagation());
        this.element.appendChild(this.search);
        this.source = document.createElement("ul");
        this.element.appendChild(this.source);
        this.render_data(this.options.data);
        document.getElementsByTagName("body")[0].appendChild(this.element);

        if (this.source.getElementsByClassName("active").length === 1) {
          this.source.getElementsByClassName("active")[0].scrollIntoView();
        } else {
          this.search.focus();
        }
      }

      destroy() {
        this.element.remove();
        this.parentElement.classList.remove("open");
      }

      onSelectValue(el) {
        const selectedValue = el.dataset.value;
        const selectedText = el.dataset.display;
        this.dropdownElement.setAttribute("data-value", selectedValue);
        this.dropdownElement.setAttribute("data-display", selectedText);
        this.dropdownElement.textContent = selectedText;
        this.destroy();

        if (this.options.onSelect != null) {
          this.options.onSelect(selectedText, selectedValue);
        }
      }

      render_data(data) {
        while (this.source.firstChild) {
          this.source.removeChild(this.source.firstChild);
        }

        for (const elementData of data) {
          const valueElement = document.createElement("li");
          const value = elementData[this.valueField];
          const display = elementData[this.displayField];
          valueElement.setAttribute("data-value", value);
          valueElement.setAttribute("data-display", display);
          valueElement.textContent = display;

          if (this.dropdownElement.dataset.value === value.toString()) {
            valueElement.classList.add("active");
          }

          valueElement.addEventListener("click", e => this.onSelectValue(e.target));
          this.source.appendChild(valueElement);
        }
      }

      search_values(el) {
        const searchstring = el.value;
        const filter = this.options.data.filter(e => e[this.displayField].trim().toLowerCase().indexOf(searchstring) > -1);
        this.render_data(filter);
      }

    }

    class utility {
      static hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
      }

    }

    class Index {
      constructor(options) {
        this.options = options;
        this.element = this.options.selector;
        this.OnCreate();
        document.addEventListener("click", e => {
          if (this.sourceObj != null) {
            this.sourceObj.destroy();
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
        this.element.addEventListener("click", e => {
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

      setValue(value) {
        for (const elementData of this.options.data) {
          const valueField = this.options.valueFiled;
          const displayField = this.options.displayField;
          const elementValue = elementData[valueField];
          const elementDisplay = elementData[displayField];

          if (value === elementValue.toString()) {
            this.dropdownelement.setAttribute("data-value", elementValue);
            this.dropdownelement.setAttribute("data-display", elementDisplay);
            this.dropdownelement.textContent = elementDisplay;
            break;
          }
        }
      }

    }

    $__default['default'].fn.AutoComplete = Object.assign(function (options) {
      if (!options) {
        console.error('Auto Complete plugin options are missing required parameter "selector": ', JSON.stringify(options));
        return null;
      }

      options = Object.assign({}, $__default['default'].fn.AutoComplete.options, options);
      options.selector = this[0];
      let instance = new Index(options);
      return instance;
    }, {
      options: {
        selector: null,
        data: ["", ""],
        valueFiled: "valueFiled",
        displayField: "displayField",
        placeholder: "Select an option",
        onSelect: null
      }
    });

}(jQuery));
