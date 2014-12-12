chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        chrome.pageAction.show(sender.tab.id);

        if (!request.command && !localStorage.getItem('trello_token')) {
            chrome.tabs.create({url: chrome.extension.getURL('settings/index.html')});
            sendResponse();
            return true;
        }

        // Now we have a token saved locally, as fetched from the settings page after authorization.
        if (request.command == 'saveToken') {
            localStorage.setItem('trello_token', request.token);
            return true;
        }

        if (request.command == 'getCardListId') {
            trelloInit();
            Trello.rest('GET', 'cards/'+request.id, {fields: "idList"}, function(data){
                sendResponse(data);
            }, function (data) {
                sendResponse(data);
            });
            return true;
        }

        if (request.command == 'getListCards') {
            trelloInit();
            Trello.rest('GET', 'lists/'+request.id+'/cards', {}, function(data){
                sendResponse(data);
            }, function (data) {
                sendResponse(data);
            });
            return true;
        }

        sendResponse();
    });

function trelloInit() {
    Trello.setKey(APP_KEY);
    Trello.setToken(localStorage.getItem('trello_token'));
}