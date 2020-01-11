There are 3 distinct src folder. Two of them are react projects created with create-react-app for two seperate pages(popup and mainpage) and backend is for extension specific code.

## Available Scripts

Commands in the project directory mainly cd into each three project and runs respective commands for each project.
In the project directory, you can run:

### `npm run watch`

Runs the app in the development mode. Builds to dev folder and watches for changes. Dev folder can be loaded as the extension.

### `npm run build`

Same as watch but without watch. Adds further optimization.

React projects keep their original commands in their own folder. They can run in there as well. For example:

Go into mainpage and start development:

### `cd mainpage`
### `npm run start`

This will start classical create-react-app development on localhost