var exportPopup;

var TrelloExportPopup = function() {

}

TrelloExportPopup.prototype.init = function() {

    // When run, this makes sure the popup isn't around.
    // If it finds the popup residue, it removes it, paving the way for a fresh one.
    var popoverScan = $('.trello_helper_export_popup');
    if ($(popoverScan).length > 0) {
        $(popoverScan).remove();
    }
    popoverScan = null;

    // Create our new popup, hidden by default
    exportPopup = $('<div class="trello_helper_export_popup" style="display: none"></div>');

    // Create a header area for the popup, which will contain the buttons / tabs
    // Create a body area, which will contain the export data
    var header = $('<div class="trello_helper_export_popup_header"></div>');
    var body = $('<div class="trello_helper_export_popup_body"></div>');

    // Create areas for exporting the data - simple non-editable textareas
    var textarea = $('<textarea class="trello_helper_export_popup_textarea exportarea" readonly="true" style="display: none"></textarea>');
    var jsonarea = $('<textarea class="trello_helper_export_popup_jsonarea exportarea" readonly="true" style="display: none"></textarea>');

    // Create header buttons / tabs
    var textButton = $('<a href="#" class="exporttab button" data-area="text">Text Export</a>');
    var jsonButton = $('<a href="#" class="exporttab button" data-area="json">JSON Export</a>');
    var closeButton = $('<a href="#" class="button right">Close</a>');

    // Have the close button close our tab, and do the same if the user clicks outside the popup
    $(closeButton).click(this.hide);

    // Put everything together
    $(header).append(jsonButton).append(textButton).append(closeButton);
    $(body).append(textarea).append(jsonarea);
    $(exportPopup).append(header).append(body);

    // Add out popup to the Trello page
    $("#content").append(exportPopup);

    // Bind listeners to the buttons / tabs in the header, so we can switch output modes
    $(".exporttab").click(function (e) {
        var area = e.currentTarget.dataset.area;
        $(".exportarea").hide();
        $(".trello_helper_export_popup_" + area + "area").show();
    });

};

TrelloExportPopup.prototype.hide = function() {
    // Execute hiding logic only if the popup is visible
    if ($(".trello_helper_export_popup").is(":visible")) {
        $(exportPopup).hide();
    }
};

TrelloExportPopup.prototype.show = function(data) {

    // Hide all textareas
    $(".exportarea").hide();
    // Show the first one by simulating a click on the first tab
    // This makes sure our export popup always opens in JSON mode
    $(".exporttab")[0].click();

    var text = '';
    var cardCount = data.length;
    var i = 0;
    while (i < cardCount) {
        text += 'Topic: ' + data[i].name;
        if (data[i].desc) {
            text += '\nDescription:\n' + data[i].desc;
        }
        text += '\n\n\n';
        i++;
    }

    $(exportPopup).find('.trello_helper_export_popup_textarea').text(text);
    $(exportPopup).find('.trello_helper_export_popup_jsonarea').text(JSON.stringify(data));
    $(exportPopup).show();
};