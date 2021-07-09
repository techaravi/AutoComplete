var autoComplete = (function () {

    function autoComplete(options) {
        if (!document.querySelector) return;

        // helpers class
        function hasClass(el, className) {
            return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
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

        function clickHandler(el, ev) {
            var controlInstance = el.target;
            if (hasClass(controlInstance, "open") == false) {
                controlInstance.setAttribute('class', "autocomplete open");

                var container = document.createElement('div');
                container.id = controlInstance.id + "source";
                container.setAttribute('class', "autocomplete-container");
                var top = (controlInstance.offsetTop + controlInstance.offsetHeight) + "px";
                var width = controlInstance.offsetWidth + "px";
                container.setAttribute('style', "top:" + top);

                controlInstance.search = document.createElement('input');
                controlInstance.search.setAttribute('class', "search");
                
                addEvent(controlInstance.search, 'keyup', searchHandler);
                container.appendChild(controlInstance.search);

                controlInstance.source = document.createElement('ul');

                for (var dataIndex = 0; dataIndex < controlInstance.data.length; dataIndex++) {
                    var values = document.createElement('li');
                    values.setAttribute('data-value', controlOption.data[dataIndex][controlOption.valueFiled]);
                    values.setAttribute('data-display', controlOption.data[dataIndex][controlOption.displayField]);
                    
                    values.textContent = controlInstance.data[dataIndex][controlOption.displayField];
                    controlInstance.source.appendChild(values);
                }
                container.appendChild(controlInstance.source);
                document.getElementsByTagName("body")[0].appendChild(container);
                controlInstance.search.focus();
            } else {
                document.getElementById(controlInstance.id + "source").remove();
                controlInstance.setAttribute('class', "autocomplete");
            }
        }

        function searchHandler(el){
            var searchstring = el.target.value;
            var searchCollection = document.querySelectorAll(".autocomplete-container>ul>li");
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

        var controlOption = {
            selector: null,
            data: [],
            valueFiled: "valueFiled",
            displayField: "displayField",
            placeholder: 'Select an option'
        };
        for (var k in options) {
            if (options.hasOwnProperty(k)) controlOption[k] = options[k];
        }

        // initilisation
        var elems = typeof controlOption.selector == 'object' ? [o.selector] : document.querySelectorAll(controlOption.selector);
        for (var i = 0; i < elems.length; i++) {
            var controlInstance = elems[i];
            controlInstance.dropdown = document.createElement('div');
            controlInstance.dropdown.id = "autocomplete" + new Date().getTime();
            controlInstance.dropdown.setAttribute('class', "autocomplete");
            controlInstance.dropdown.data = controlOption.data;
            controlInstance.dropdown.textContent = controlOption.placeholder;
            
            var arrow =  document.createElement('div');
            arrow.setAttribute('class', "arrow");
            controlInstance.dropdown.appendChild(arrow);

            controlInstance.appendChild(controlInstance.dropdown);
            addEvent(controlInstance.dropdown, 'click', clickHandler);



        }
       
        // public destroy method
        this.destroy = function () {
            for (var i = 0; i < elems.length; i++) {
                var controlInstance = elems[i];
                controlInstance.removeChild(controlInstance.search);
                controlInstance.removeChild(controlInstance.source);
                controlInstance = null;
            }
        };
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