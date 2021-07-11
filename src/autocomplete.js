var autoComplete = (function () {

    function autoComplete(options) {
        if (!document.querySelector) return;

        // helpers class
        function hasClass(el, className) {
            return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
        }
        function addEvent(el, type, handler) {
            if (el.attachEvent) el.attachEvent('on' + type, handler);
            else el.addEventListener(type, handler);
        }
        function removeEvent(el, type, handler) {
            // if (el.removeEventListener) not working in IE11
            if (el.detachEvent) el.detachEvent('on' + type, handler);
            else el.removeEventListener(type, handler);
        }

        this.options = {
            selector: null,
            data: [],
            valueFiled: "valueFiled",
            displayField: "displayField",
            placeholder: "Select an option",
            onSelect:null
        };
        for (var k in options) {
            if (options.hasOwnProperty(k)) this.options[k] = options[k];
        }

        // initilisation
        var elems = typeof this.options.selector == "object" ? [o.selector] : document.querySelectorAll(this.options.selector);

        var element = elems[0];
        this.element = document.createElement("div");
        this.element.id = "autocomplete" + new Date().getTime();
        this.element.setAttribute("class", "autocomplete");
        this.element.data = this.options.data;

        var dropdowntext = document.createElement("span");
        dropdowntext.textContent = this.options.placeholder;
        this.element.appendChild(dropdowntext);
        this.element.dropdowntext = dropdowntext;


        var arrow = document.createElement("div");
        arrow.setAttribute("class", "arrow");
        this.element.appendChild(arrow);

        element.appendChild(this.element);
        var that = this;
        addEvent(this.element, 'click', function (event) {
            show_data(event,that);            
            event.stopPropagation();
        });
        addEvent(document, 'click', function (event) {
            that.sourceContainer.remove();
            that.element.setAttribute("class", "autocomplete");
        });

         function show_data (el,context) {
            //var controlInstance = this;
            if (hasClass(context.element, "open") == false) {
                context.element.setAttribute("class", "autocomplete open");

                var container = document.createElement("div");
                container.id = context.element.id + "source";
                container.setAttribute("class", "autocomplete-container");
                var top = (context.element.offsetTop + context.element.offsetHeight) + "px";
//                var width = this.dropdown.offsetWidth + "px";
                container.setAttribute("style", "top:" + top);

                context.search = document.createElement("input");
                context.search.setAttribute("class", "search");
                var that = context;
                addEvent(context.search, 'keyup', function (event) {
                    search_values(event,that);
                    event.stopPropagation();
                });
                addEvent(context.search, 'click', function (event) {
                    event.stopPropagation();
                });

                container.appendChild(context.search);
                context.sourceContainer = container;
                context.source = document.createElement("ul");


                for (var dataIndex = 0; dataIndex < context.options.data.length; dataIndex++) {
                    var values = document.createElement("li");
                    values.setAttribute("data-value", context.options.data[dataIndex][context.options.valueFiled]);
                    values.setAttribute("data-display", context.options.data[dataIndex][context.options.displayField]);

                    values.textContent = context.options.data[dataIndex][context.options.displayField];
                    if (context.element.dataset.value == context.options.data[dataIndex][context.options.valueFiled]) {
                        values.setAttribute("class", "active");
                        //values.scrollIntoView();
                    }
                    addEvent(values, 'click', function (event) {
                        onSelectValue(event,that);
                        event.stopPropagation();
                    });
                    context.source.appendChild(values);
                }
                container.appendChild(context.source);
                document.getElementsByTagName("body")[0].appendChild(container);
                

                if (context.source.getElementsByClassName("active").length == 1) {
                    context.source.getElementsByClassName("active")[0].scrollIntoView();
                } else {
                    context.search.focus();
                }
            } else {
                hideSource(context);
            }
        };

        function search_values(el,context) {
            var searchstring = el.target.value;
            var searchCollection = context.source.children;
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

        function hideSource(context){
            var searchCollection = context.source.children;
            for (var index = 0; index < searchCollection.length; index++) {
                removeEvent(searchCollection[index],"*");
            }            
            removeEvent(context.search,"*");
            context.sourceContainer.remove();
            context.element.setAttribute("class", "autocomplete");
        }

        function onSelectValue(el,context) {
            var selectedValue = el.target.dataset.value;
            var selectedText = el.target.dataset.display;
            context.element.setAttribute("data-value", selectedValue);
            context.element.setAttribute("data-display", selectedText);
            context.element.dropdowntext.textContent = selectedText;
            hideSource(context);
            if(context.options.onSelect != null){
                context.options.onSelect (selectedText, selectedValue);
            }
        };
        // public destroy method
        this.destroy = function () {
            removeEvent(this.element,"*");
            removeEvent(document,"click");
            this.removeChild(this.search);
            this.removeChild(this.source);
            this.removeChild(this.element);
        };

        this.getValue = function () {
            return this.element.dataset.value;

        };
        this.setValue = function (value) {
            for (var dataIndex = 0; dataIndex < this.options.data.length; dataIndex++) {
                if (value == this.options.data[dataIndex][this.options.valueFiled]) {
                    this.element.setAttribute("data-value", this.options.data[dataIndex][this.options.valueFiled]);
                    this.element.setAttribute("data-display", this.options.data[dataIndex][this.options.displayField]);
                    this.element.dropdowntext.textContent = this.options.data[dataIndex][this.options.displayField];
                    break;
                }
            }

        };
    }

    return autoComplete;
})();

(function () {
    if (typeof define === "function" && define.amd)
        define("autoComplete", function () {
            return autoComplete;
        });
    else if (typeof module !== "undefined" && module.exports)
        module.exports = autoComplete;
    else
        window.autoComplete = autoComplete;
})();