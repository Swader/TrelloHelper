## 0.2

- New way to register page-readiness via [TrelloUI](https://github.com/swader/TrelloUI)
- Reorganized folders slightly, removed some extra files

## TODO

- design and replace icon
- re-implement popup with React?
- add field selector for output (customization of output)
- add more output formats
- add "Download as file" option
- add cache to remember which board a list belongs to. Account for moving lists to other boards - nullify cache
- take safety measures against duplicate option spawns (maniacally clicking the menu while still open will spawn more Export options)
- place safeguards against infinite loops
- make sure Settings tab closes after authorization
- make loader/overlay when clicking export - some kind of indication something is happening
- prettify settings page