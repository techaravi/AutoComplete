var autoComplete = (function(){
 
  function autoComplete(options){
      if (!document.querySelector) return;

      // helpers class
      

      var controlOption = {
          selector: null,
          data:[],
          valueFiled:"valueFiled",
          displayField:"displayField"
      };
      for (var k in options) { if (options.hasOwnProperty(k)) controlOption[k] = options[k]; }

      // initilisation
      var elems = typeof controlOption.selector == 'object' ? [o.selector] : document.querySelectorAll(controlOption.selector);
      for (var i=0; i<elems.length; i++) {
          var controlInstance = elems[i];
          controlInstance.search = document.createElement('input');
          controlInstance.search.type="text";
          controlInstance.search.setAttribute('list',controlInstance.id + "source");
          controlInstance.search.setAttribute('class',"form-control");

          controlInstance.source = document.createElement('datalist');
          controlInstance.source.id = controlInstance.id + "source";
          for (var dataIndex=0; dataIndex<controlOption.data.length; dataIndex++) {
            var values = document.createElement('option');
            values.value = controlOption.data[dataIndex][controlOption.valueFiled];
            controlInstance.source.appendChild(values);
          }      
          controlInstance.appendChild(controlInstance.search);    
          controlInstance.appendChild(controlInstance.source);
      }

      // public destroy method
      this.destroy = function(){
          for (var i=0; i<elems.length; i++) {
              var controlInstance = elems[i];
              controlInstance.removeChild(controlInstance.search);
              controlInstance.removeChild(controlInstance.source);
              controlInstance = null;
          }
      };
  }
  return autoComplete;
})();

(function(){
  if (typeof define === 'function' && define.amd)
      define('autoComplete', function () { return autoComplete; });
  else if (typeof module !== 'undefined' && module.exports)
      module.exports = autoComplete;
  else
      window.autoComplete = autoComplete;
})();
