var TrelloUI = function (options) {
    this._defaultOptions = {
        dispatchBoardReady: false,
        dispatchListsReady: false
    };
    this.options = jQuery.extend({}, this._defaultOptions, options);

    var eventDefaults = {
        bubbles: true,
        cancelable: true
    };

    this.possibleEvents = {
        boardEvent: new Event('trelloui-boardready', eventDefaults),
        listsEvent: new Event('trelloui-listsready', eventDefaults)
    };

    setInterval(this._checkState.bind(this), 1000);
};

TrelloUI.prototype._checkState = function () {
    if (this.options.dispatchBoardReady) {
        if (!$('#board').hasClass(this.possibleEvents.boardEvent.type)) {
            this._registerEvents();
        }
    }
    if (this.options.dispatchListsReady) {
        var lists = $('lists');
        if (!lists.length || !$(lists[0]).hasClass(this.possibleEvents.listsEvent.type)) {
            this._registerEvents();
        }
    }
};

TrelloUI.prototype._registerEvents = function () {
    var current = this;

    if (this.options.dispatchBoardReady) {
        var boardInterval = setInterval(function () {
            var board = $('#board');
            if (board && !$(board).hasClass(current.possibleEvents.boardEvent.type)) {
                document.dispatchEvent(current.possibleEvents.boardEvent);
                $(board).addClass(current.possibleEvents.boardEvent.type);
                clearInterval(boardInterval);
            }
        }, 100);
    }

    if (this.options.dispatchListsReady) {
        var listsInterval = setInterval(function() {
            var lists = $('.list');
            if (lists.length > 0 && !$(lists[0]).hasClass(current.possibleEvents.listsEvent.type)) {
                document.dispatchEvent(current.possibleEvents.listsEvent);
                $(lists[0]).addClass(current.possibleEvents.listsEvent.type);
                clearInterval(listsInterval);
            }
        }, 100);
    }
};
