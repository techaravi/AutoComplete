import $ from 'jquery';
import { Index } from './index';
$.fn.AutoComplete = Object.assign(function (options) {
    if (!options) {
        console.error('Auto Complete plugin options are missing required parameter "selector": ', JSON.stringify(options));
        return null;
    }
    options = Object.assign({}, $.fn.AutoComplete.options, options);
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
