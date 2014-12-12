var tep = new TrelloExportPopup();

chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            console.log("Init launched");

            var popover = $(".pop-over");

            tep.init();

            $('.list-header-menu-icon').click(function (event) {
                var popover_summoned_interval = setInterval(function () {
                    if ($(popover).is(':visible')) {
                        clearInterval(popover_summoned_interval);
                        $(".pop-over .content").append('<hr><ul class="pop-over-list"> <li><a class="js-export-list" href="#">Export This List</a></li> </ul>');
                        $(".js-export-list").click(function (e) {
                            exportList(event);
                        });
                    }
                }, 50);
            });
        }
    }, 10);
});

function exportList(event) {
    tep.hide();
    var first_card_id = findFirstCardId(event);
    if (!first_card_id) {
        alert('No cards found in the list.');
        return false;
    }

    chrome.extension.sendMessage({
        command: 'getCardListId',
        id: first_card_id
    }, function (data) {
        if (data.idList !== undefined) {
            chrome.extension.sendMessage({
                command: 'getListCards',
                id: data.idList
            }, function (data) {
                tep.show(data);
            });
        }
    });
}


/**
 * Uses the menu button on a card to find the first card in that list and get its ID
 * Returns false if not found, or the ID if there is a card
 * @param event
 * @returns bool | string
 */
function findFirstCardId(event) {
    var titles = $(event.currentTarget).parent().parent().find('a.list-card-title:first');
    if (titles[0] === undefined) {
        console.error('List has no cards!');
        return false;
    } else {
        return $(titles[0]).attr('href').split('/')[2];
    }
}