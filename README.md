## Trello Helper

Trello Helper is a Google Chrome / Chromium extension which adds some missing functionality to Trello's UI.

Currently, all it does is add an "Export List" option to the list menu.

The formats are TXT and JSON. The text format currently only outputs title and description, as a demonstration, and the JSON format will churn out the entire card object as fetched from Trello's API.

To clean and/or edit the JSON, use tools like [JSON Editor Online](http://jsoneditoronline.org/) or [JSON to CSV](https://json-csv.com/) for now.
 
## Contributions

This extension was originally written as a tutorial for SitePoint, but has since evolved and I'll gladly look at PRs if you have any. The only rule is - no JS frameworks. AngularJS and the like are a big no-no.

## License

See [LICENSE.md](LICENSE.md).

## Interested parties can:

- replace icon
- re-implement popup with React?
- fix issues as laid out in tutorial
- add field selector for output (customization of output)
- add more output formats
- add "Download as file" option