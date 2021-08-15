import { Index } from './index';

// Define a test suite for the example service.
describe('Index', () => {
  const instanceElement:HTMLDivElement = document.createElement("div");
  instanceElement.id="samplediv";
  document.body.appendChild(instanceElement);
  // Define a test for the example service.
  it('should create baisc auto complete dropdown', () => {
    // tslint:disable-next-line: no-unused-expression
    new Index({selector: instanceElement,data: ["",""],valueFiled: "valueFiled",displayField: "displayField",placeholder: "Select an option",onSelect: null});
    expect(instanceElement.className).toBe('autocomplete');
  });

  it('should get and set value from auto complete dropdown', () => {
    const data:any=[{displayField:"sample1",valueFiled:"1"},{displayField:"sample2",valueFiled:"2"},{displayField:"sample3",valueFiled:"3"}]
    // tslint:disable-next-line: no-unused-expression
    const instance:Index = new Index({selector: instanceElement,data:data,valueFiled: "valueFiled",displayField: "displayField",placeholder: "Select an option",onSelect: null});
    instance.setValue("2");
    expect(instance.getValue()).toBe('2');
  });
});
