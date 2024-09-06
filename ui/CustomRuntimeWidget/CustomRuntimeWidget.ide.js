TW.IDE.Widgets.CustomRuntimeWidget = function () {
  // Set icon path
  this.widgetIconUrl = function () {
    return "../Common/extensions/CustomRuntimeWidget/ui/CustomRuntimeWidget/icon.png";
  };

  // Set initial widget properties (static)
  this.widgetProperties = function () {
    return {
      name: "CustomRuntimeWidget",
      description: "Create your own custom runtime widget directly in the Mashup Builder",
      category: ["Common"],
      properties: {
        RuntimeCode: {
          baseType: "TEXT",
          defaultValue:
            '/**\n * All properties of this object will be attached to the widget instance and thus accessible via the \'this\' keyword\n * (at runtime). You can add ThingWorx runtime functions here (invoked automatically by the runtime) as well as own\n * functions and any kind of variable (invoked manually by your code).\n */\nreturn {\n  /**\n   * Return HTML code that has to be rendered (once).\n   * You can also add <style> and <script> here. It\'s recommended to limit the scope of JavaScript and CSS to the root\n   * element id (\'this.jqElementId\').\n   */\n  renderHtml() {\n    return `<div class="widget-content">\n              <h1>Doubling calculator</h1>\n              <p>Simply bind and change the property <code>testNumber</code> to the widget and see the magic!</p>\n              <p>Result: <span class="magic-text"></span></div>\n            </div>\n            <style>\n              #${this.jqElementId} {\n                border: 1px solid black;\n                margin: 1rem;\n                padding: 1rem;\n                display: flex;\n                flex-direction: column;\n                gap: 1rem;\n              }\n              #${this.jqElementId} * {\n                font-size: 1rem;\n              }\n            </style>`;\n  },\n\n  /**\n   * Invoked by ThingWorx after the widget is rendered.\n   */\n  afterRender() {\n    // Here we want to show the default/static value immediately after rendering the static HTML (without result text).\n    // This could also be done directly inside \'renderHtml()\', but here we do it afterwards, because then we can\n    // make use of the \'doTheMagic\' function instead of just inserting it as a string in the HTML code.\n    this.doTheMagic(this.getProperty("testNumber"));\n  },\n\n  /**\n   * Invoked by ThingWorx after one of the properties is updated.\n   */\n  updateProperty(updatePropertyInfo) {\n    if (updatePropertyInfo.TargetProperty === "testNumber") {\n      this.doTheMagic(updatePropertyInfo.RawSinglePropertyValue);\n    }\n  },\n\n  /**\n   * Magic function that does the calculation and prints the result (DOM update).\n   */\n  doTheMagic(testNumber) {\n    const elementForResult = document.querySelector(`#${this.jqElementId} .magic-text`);\n    if (typeof testNumber === "number") {\n      const result = testNumber * 2;\n      elementForResult.innerText = `The double of ${testNumber} is ${result} 😮`;\n    } else {\n      elementForResult.innerHTML = `<code>testNumber</code> is ${testNumber} 🤔`;\n    }\n  },\n};\n',
        },
        Configuration: {
          baseType: "JSON",
          defaultValue: '{"testNumber":{"baseType":"NUMBER","defaultValue":0,"isBindingTarget":true}}',
        },
        // Other (custom) properties will be added in the 'afterLoad' function
      },
    };
  };

  // Add custom user properties (will be invoked by ThingWorx)
  this.afterLoad = function () {
    var customProperties = JSON.parse(this.getProperty("Configuration"));
    this.addConfiguration(customProperties);
  };

  // Render widget placeholder for the Mashup Builder
  this.renderHtml = function () {
    return `<div class="widget-content" style="padding:1em;border:1px solid #3d4647;display:flex;gap:0.5em;align-items:center"><img src="${this.widgetIconUrl()}">CustomRuntimeWidget</div>`;
  };

  // Delete no longer existing custom properties by comparing the old configuration with the new one.
  // Without this step, all old custom properties would still exist even there are not in the new configuration.
  // This function will be invoked by ThingWorx after the user confirms the new JSON/configuration.
  this.beforeSetProperty = function (name, value) {
    if (name === "Configuration") {
      const currentCustomPropertyNames = Object.keys(JSON.parse(this.getProperty("Configuration")));
      const newCustomPropertyNames = Object.keys(JSON.parse(value));
      const propertyNamesToDelete = currentCustomPropertyNames.filter(
        (e1) => newCustomPropertyNames.findIndex((e2) => e1 === e2) === -1
      );
      const allWidgetProperties = this.allWidgetProperties().properties;
      propertyNamesToDelete.forEach((e) => delete allWidgetProperties[e]);
      // Usually at this point a 'this.updatedProperties()' is necessary. However, in the whole chain of function
      // calls that happen here, at the end the 'this.updatedProperties()' is called within 'this.addConfiguration()'.
    }
  };

  // Add new and change existing custom properties after the new configuration JSON is set
  this.afterSetProperty = function (name, value) {
    if (name === "Configuration") {
      this.addConfiguration(JSON.parse(value));
    }
  };

  // Helper function to actually add custom properties to the widget
  this.addConfiguration = function (customProperties) {
    Object.keys(customProperties).forEach((propertyName) => {
      this.allWidgetProperties().properties[propertyName] = {
        type: "property",
        name: propertyName,
        ...customProperties[propertyName],
      };
    });
    this.updatedProperties();
  };
};
