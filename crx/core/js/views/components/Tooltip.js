window.DependencyLoader.push(['BaseView'], function() {

    /**
     * TooltipView
     * 
     * @extends BaseView
     */
    window.TooltipView = BaseView.extend({

        /**
         * _$relative
         * 
         * @access  protected
         * @var     null|jQuery (default: null)
         */
        _$relative: null,

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'TooltipView')
         */
        _string: 'TooltipView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @param   jQuery $relative
         * @param   Object data
         * @return  void
         */
        init: function(element, $relative, data) {
            this._$relative = $relative;
            this._super(element);
            this._data = data;
            this._element.attr('direction', data.direction);
            this._addHoverListeners();
            this._addScrollListener();
        },

        /**
         * _addHoverListeners
         * 
         * @access  protected
         * @return  void
         */
        _addHoverListeners: function() {
            var _this = this;
            this._$relative.on({
                'mouseleave': function(event) {
                    _this._hide();
                },
                'mouseover': function(event) {
                    _this._show();
                }
            });
        },

        /**
         * _addScrollListener
         * 
         * @see     https://stackoverflow.com/questions/16363238/scroll-event-doesnt-fire-unless-page-moves
         * @access  protected
         * @return  Boolean
         */
        _addScrollListener: function() {
            var _this = this,
                $document = $(document),
                scrollListenerAdded = $document.data('scrollListenerAdded');
            $document.on({
                'tooltip/scroll': function(event) {
                    _this._hide();
                }
            });
            if (scrollListenerAdded === true) {
                return false;
            }
            $document.data('scrollListenerAdded', true);
            $document.on('mousewheel DOMMouseScroll MozMousePixelScroll', function(event, delta) {
                $document.triggerHandler('tooltip/scroll');
            });
        },

        /**
         * _getDimensions
         * 
         * @access  protected
         * @return  Object
         */
        _getDimensions: function() {
            var dimensions = {
                element: {
                    width: this._element.outerWidth(),
                    height: this._element.outerHeight()
                },
                relative: {
                    width: this._$relative.outerWidth(true),
                    height: this._$relative.outerHeight(true)
                }
            };
            return dimensions;
        },

        /**
         * _hide
         * 
         * @access  protected
         * @return  void
         */
        _hide: function() {
            this._element.css({
                'display': 'none'
            });
        },

        /**
         * _position
         * 
         * @access  protected
         * @return  void
         */
        _position: {

            /**
             * auto
             * 
             * @access  protected
             * @return  void
             */
            auto: function() {
                var method = this._data.direction;
                this._position[method].apply(this);
            },

            /**
             * down
             * 
             * @access  protected
             * @return  void
             */
            down: function() {
                var dimensions = this._getDimensions(),
                    offset = this._$relative.offset(),
                    padding = 4,
                    top = offset.top + dimensions.relative.height + padding,
                    left = offset.left - (dimensions.element.width / 2) + (dimensions.relative.width / 2);
                this._element.css({
                    left: left,
                    top: top
                });
            },

            /**
             * right
             * 
             * @access  protected
             * @return  void
             */
            right: function() {
                var dimensions = this._getDimensions(),
                    offset = this._$relative.offset(),
                    padding = 8,
                    top = offset.top - (dimensions.element.height / 2) + (dimensions.relative.height / 2),
                    left = offset.left + dimensions.relative.width + padding;
                this._element.css({
                    left: left,
                    top: top
                });
            }
        },

        /**
         * _show
         * 
         * @access  protected
         * @return  void
         */
        _show: function() {
            this._element.css({
                'display': 'block'
            });
            this._position.auto.apply(this);
        }
    });
});
