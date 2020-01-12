There are 3 distinct src folder. Two of them are react projects created with create-react-app for two seperate pages(popup and mainpage) and backend is for extension specific code.

## Available Scripts

Commands in the project directory mainly cd into each three project and runs respective commands for each project.
In the project directory, you can run:

### `npm run watch`

Runs the app in the development mode. Builds to dev directory and watches for changes. Dev folder can be loaded as the extension.

### `npm run build`

Same as watch but without watch. Builds to build directory. Adds further optimization.

React projects keep their original commands in their own folder. They can be run in there as well. For example:

Go into mainpage and start development:

### `cd mainpage`
### `npm run start`

This will start classical create-react-app development on localhost

Loading the extension

Open the Extension Management page by navigating to chrome://extensions.
The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
Enable Developer Mode by clicking the toggle switch next to Developer mode.
Click the LOAD UNPACKED button and select the extension directory.