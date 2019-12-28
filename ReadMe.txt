summary
- main jobs like listening to tab events and saving data is done in background.js
- data is saved to localStorage
- different parts of the extension can access this localStorage
- background.js and ui.js gets bundled to dist/ because they need bundling since they require to import npm packages

loading the extension
- click load unpacked in extensions page
- select extension folder