// Create an immediately invoked functional expression to wrap our code
(function() {

    // Define our constructor  
    this.autoComplete = function(el) {
  
      // Define option defaults
      var defaults = {
      className: 'fade-and-drop'
      }
  
      // Create options by extending defaults with the passed in arugments
      if (arguments[0] && typeof arguments[0] === "object") {
        this.options = extendDefaults(defaults, arguments[0]);
      }
      document.getElementById("example1").appendChild(document.createElement("select"));
  
    }
  
    // Utility method to extend defaults with user options
    function extendDefaults(source, properties) {
      var property;
      for (property in properties) {
        if (properties.hasOwnProperty(property)) {
          source[property] = properties[property];
        }
      }
      return source;
    }
  
  }());