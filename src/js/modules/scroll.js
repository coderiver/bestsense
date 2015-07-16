function scroll() {

    var root                = $(document);
    var win                 = $(window);
    var rootHeight          = root.height();
    var TRIGGER_HOOK_ENTER  = 'onEnter';
    var TRIGGER_HOOK_CENTER = 'onCenter';
    var TRIGGER_HOOK_LEAVE  = 'onLeave';
    var EVENTS = {
        progress: 'progress',
        start: 'start',
        end: 'end'
    };

    var Scroll = {
        scrollPos: 0,
        viewHeight: win.height()
    };

    Scroll.Scene = function(settings) {
        this.settings    = settings || {};
        this.$el         = settings.element instanceof jQuery ? settings.element : $(settings.element);
        this.$trigger    = settings.trigger instanceof jQuery ? settings.trigger : $(settings.trigger);
        this.triggerHook = settings.triggerHook || TRIGGER_HOOK_ENTER;
        this.progress    = 0;

        this.init();
    };

    Scroll.Scene.prototype = {

        constructor: Scroll.Scene,

        _calcDuration: function() {
            var duration = this.settings.duration;

            if (typeof duration == 'undefined' || duration === 0) {
                this.duration = null;
            } else if ($.isNumeric(duration)) {
                this.duration = parseInt(duration);
            } else if (typeof duration == 'string' && duration.indexOf('%') > -1) {
                this.duration = Math.round(Scroll.viewHeight * parseInt(duration) / 100);
            }
        },

        _calcStartEnd: function() {
            if (this.triggerHook == TRIGGER_HOOK_ENTER) {
                this.posStart = this.$trigger.offset().top - Scroll.viewHeight;
                this.posEnd   = this.posStart + this.duration || 0;
            }
        },

        _updateProgress: function() {},

        init: function() {
            this._calcDuration();
            this._calcStartEnd();
            console.log(this);
        }

    }

    Scroll._initEvents = function() {
        root.on('scroll', function() {
            Scroll.scrollPos = root.scrollTop();
            console.log(Scroll.scrollPos);
        });
    };

    Scroll._initEvents();

    return Scroll;

}

module.exports = scroll();
