TW.Runtime.Widgets.CustomRuntimeWidget = function () {
  // Define the runtime widget by using a simple property (JavaScript object) that contains all functions
  const runtimeCodeObject = new Function(this.getProperty("RuntimeCode"))();
  Object.keys(runtimeCodeObject).forEach((name) => (this[name] = runtimeCodeObject[name]));
};
