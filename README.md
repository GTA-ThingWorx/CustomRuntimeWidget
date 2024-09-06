# CustomRuntimeWidget

## Introduction

This ThingWorx extension allows you to build a custom runtime widget directly in the Mashup Builder.

Main features:

- Implementation of any widget logic and visualization using standard web technologies (HTML, CSS, JavaScript, ...)
- Data reactivity with full ThingWorx binding and data type compatibility
- Any ThingWorx data type is supported
- Lightweight widget without any dependencies

## Getting started

1. Clone this repository and just _zip_ the `metadata.xml` file and `ui` folder. Alternatively, you can simply download the latest release file [here](https://github.com/GTA-ThingWorx/CustomRuntimeWidget/releases).
2. Open the ThingWorx Composer and import the `zip` file as an extension.
3. Open a mashup in edit mode and drag the `CustomRuntimeWidget` widget in your mashup.
4. Because of a bug, you have to edit the `Configuration` property of the widget (just make a minor change, e. g. change the default value of `testNumber` to `1`).
5. Click on `View Mashup` and see the result.

Notes:

- The logic of the example is in the `RuntimeCode` property. There is no good way to look at the code within the Composer. You should copy the content and edit it in an (JavaScript) editor.
- You can also bind `testNumber` to something so you can see the reactivity.
- Feel free to add and change properties and also change the logic (value of `RuntimeCode`). [Here you can find a good resource for further information](https://support.ptc.com/help/thingworx/platform/r9/en/ThingWorx/Help/Best_Practices_for_Developing_Applications/visualization_WidgetApiRuntime.html#).
