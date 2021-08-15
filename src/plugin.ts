import $ from 'jquery';
import { Index } from './index';

// Define the plugin function on the jQuery extension point.
// Note: Function and global default options must be combined as long as the options are mandatory.
$.fn.AutoComplete = Object.assign<PluginFunction, PluginGlobalOptions>(
  function (this: JQuery, options: PluginOptions): any {
    if (!options) {
      //console.log('Auto Complete plugin options are missing required parameter "selector": ', JSON.stringify(options));
      return null;
    }

    // Merge the global options with the options given as argument.
    options = $.extend($.fn.AutoComplete.options, options);
    options.selector=this[0] as HTMLElement;
    // Do what the plugin should do. Here we create an instance of the separate service which is then used when the
    // user clicks the element that the plugin is attached to. It produces a greeting message and appends it to the output.
    const instance = new Index(options);

    // Return the jQuery object for chaining.
    return instance;

  },
  // Define the global default options.
  {
    options: {
      selector: null,
      data: ["",""],
      valueFiled: "valueFiled",
      displayField: "displayField",
      placeholder: "Select an option",
      onSelect: null
    }
  }
);
