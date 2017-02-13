# newtab
A nice new tab page replacement

## Screenshots

**Default Page**

![Default](https://raw.githubusercontent.com/ma-santoso/newtab/master/screenshots/default.png)

**Search Page**

![Search](https://raw.githubusercontent.com/ma-santoso/newtab/master/screenshots/search.png)

## How to use

Replace your startpage/new tab page of your browser with this either manually or using an extension.

## How to edit bookmark entries

Bookmark entries are stored in `bookmark.json`, you can edit it to add or remove bookmarks. I'm planning to add the ability to edit the entries directly from the page in the future, but for now, this should suffice.

## How to add categories

If you added new cateogries by editting bookmark.json, link of the new categories will automatically be created. However, you still need to create a new partial (in /parts) to display the links in that category, and an additional route in script.js.

## Notes

This was only created in a couple of hours and I haven't re checked the codes, so it might look messy on the inside, but so far everything seems to work. Will look into the codes again before adding more features.

## Changelog

### 20170126

* Now built using gulp, the compiled build is in `dist` folder. To compile it yourself, use `gulp build`. Check `package.json` for dependencies.
* Removed my owm personal bookmarks and added new common ones.
* No new features introduced yet.
