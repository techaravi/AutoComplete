export class utility {
    static hasClass(el: HTMLElement, className: string) {
      return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
    }
  
  }