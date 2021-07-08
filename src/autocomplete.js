var autoComplete = (function () {

    function autoComplete(options) {
        if (!document.querySelector) return;

        // helpers class
        function hasClass(el, className) {
            return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
        }


        this.options = {
            selector: null,
            data: [],
            valueFiled: "valueFiled",
            displayField: "displayField",
            placeholder: 'Select an option'
        };
        for (var k in options) {
            if (options.hasOwnProperty(k)) this.options[k] = options[k];
        }

        // initilisation
        var elems = typeof this.options.selector == 'object' ? [o.selector] : document.querySelectorAll(this.options.selector);

        this.element = elems[0];
        this.dropdown = document.createElement('div');
        this.dropdown.id = "autocomplete" + new Date().getTime();
        this.dropdown.setAttribute('class', "autocomplete");
        this.dropdown.data = this.options.data;
        this.dropdown.textContent = this.options.placeholder;

        var arrow = document.createElement('div');
        arrow.setAttribute('class', "arrow");
        this.dropdown.appendChild(arrow);

        this.element.appendChild(this.dropdown);
        var that = this;
        this.dropdown.onclick = function (event) {
            that.clickHandler(event);
            event.stopPropagation();
        };
        document.onclick = function (event) {
            that.sourceContainer.remove();
            that.dropdown.setAttribute('class', "autocomplete");
        }

        this.clickHandler = function (el) {
            //var controlInstance = this;
            if (hasClass(this.dropdown, "open") == false) {
                this.dropdown.setAttribute('class', "autocomplete open");

                var container = document.createElement('div');
                container.id = this.dropdown.id + "source";
                container.setAttribute('class', "autocomplete-container");
                var top = (this.dropdown.offsetTop + this.dropdown.offsetHeight) + "px";
                var width = this.dropdown.offsetWidth + "px";
                container.setAttribute('style', "top:" + top);

                this.search = document.createElement('input');
                this.search.setAttribute('class', "search");
                var that = this;
                this.search.onkeyup = function (event) {
                    that.searchHandler(event);
                    event.stopPropagation();
                };
                this.search.onclick = function (event) {
                    event.stopPropagation();
                };


                container.appendChild(this.search);
                this.sourceContainer = container;
                this.source = document.createElement('ul');


                for (var dataIndex = 0; dataIndex < this.options.data.length; dataIndex++) {
                    var values = document.createElement('li');
                    values.setAttribute('data-value', this.options.data[dataIndex][this.options.valueFiled]);
                    values.setAttribute('data-display', this.options.data[dataIndex][this.options.displayField]);

                    values.textContent = this.options.data[dataIndex][this.options.displayField];
                    if (this.dropdown.dataset.value == this.options.data[dataIndex][this.options.valueFiled]) {
                        values.setAttribute('class', "active");
                        //values.scrollIntoView();
                    }

                    values.onclick = function (event) {
                        that.selectValueHandler(event);
                        event.stopPropagation();
                    };
                    this.source.appendChild(values);
                }
                container.appendChild(this.source);
                document.getElementsByTagName("body")[0].appendChild(container);


                if (this.source.getElementsByClassName("active").length == 1) {
                    this.source.getElementsByClassName("active")[0].scrollIntoView();
                } else {
                    this.search.focus();
                }
            } else {
                this.sourceContainer.remove();
                this.dropdown.setAttribute('class', "autocomplete");
            }
        };

        this.searchHandler = function (el) {
            var searchstring = el.target.value;
            var searchCollection = this.source.children;
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

        this.selectValueHandler = function (el) {
            var selectedValue = el.target.dataset.value;
            var selectedText = el.target.dataset.display;
            this.dropdown.setAttribute('data-value', selectedValue);
            this.dropdown.setAttribute('data-display', selectedText);
            this.dropdown.textContent = selectedText;
            this.sourceContainer.remove();
            this.dropdown.setAttribute('class', "autocomplete");
        };
        // public destroy method
        this.destroy = function () {
            this.removeChild(this.search);
            this.removeChild(this.source);
        };

        this.getValue = function () {};
        this.setValue = function (value) {};
    }

    return autoComplete;
})();

(function () {
    if (typeof define === 'function' && define.amd)
        define('autoComplete', function () {
            return autoComplete;
        });
    else if (typeof module !== 'undefined' && module.exports)
        module.exports = autoComplete;
    else
        window.autoComplete = autoComplete;
})();