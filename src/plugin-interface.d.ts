/**
 * Options for the  plugin.
 */
interface PluginOptions {
  /**
   * CSS selector for the element where generated messages are inserted. (required)
   */
   selector: HTMLElement;
  /**
   * Data for the control. (optional)
   */
  data?: [string, string];
  /**
 * Value Field Name in Data Property. (optional)
 */
  valueFiled?: string;
  /**
* Display Field Name in Data Property. (optional)
*/
  displayField?: string;
  /**
* Place holder Name. (optional)
*/
  placeholder?: string;
  /**
 * On Select Event. (optional)
 */
  onSelect?: any;
}

/**
 * Global options of the  plugin available as properties on $.fn object.
 */
interface PluginGlobalOptions {
  /**
   * Global options of the  plugin.
   */
  options: PluginOptions;
}

/**
 * Function to apply the  plugin to the selected elements of a jQuery result.
 */
interface PluginFunction {
  /**
   * Apply the  plugin to the elements selected in the jQuery result.
   *
   * @param options Options to use for this application of the  plugin.
   * @returns jQuery result.
   */
  (options: PluginOptions): any;
}

/**
 * Declaration of the  plugin.
 */
interface AutoComplete extends PluginGlobalOptions, PluginFunction { }

/**
 * Extend the jQuery result declaration with the  plugin.
 */
interface JQuery {
  /**
   * Extension of the  plugin.
   */
  AutoComplete: AutoComplete;
}
