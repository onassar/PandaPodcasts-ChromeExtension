window.DependencyLoader.push(['BaseView'], function() {

    /**
     * BaseModalView
     * 
     * @extends BaseView
     */
    window.BaseModalView = BaseView.extend({

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'BaseModalView')
         */
        _string: 'BaseModalView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @return  void
         */
        init: function(element) {
            this._super(element);
            this._addCloseListeners();
        },

        /**
         * _addCloseListeners
         * 
         * @access  protected
         * @return  void
         */
        _addCloseListeners: function() {
            this._addCloseAnchorListener();
            this._addOverlayCloseListener();
        },

        /**
         * _addCloseAnchorListener
         * 
         * @access  protected
         * @return  void
         */
        _addCloseAnchorListener: function() {
            var _this = this,
                $element = this._element,
                $anchor = $element.find('[lookup="close"]');
            $anchor.on({
                'click': function(event) {
                    event.preventDefault();
                    _this.hide();
                }
            });
        },

        /**
         * _addOverlayCloseListener
         * 
         * @access  protected
         * @return  void
         */
        _addOverlayCloseListener: function() {
            var _this = this,
                $element = this._element;
            $element.on({
                'click': function(event) {
                    var $target = $(event.target);
                    if ($target.is($element) === true) {
                        _this.hide();
                    }
                }
            });
        },

        /**
         * hide
         * 
         * @access  protected
         * @return  void
         */
        hide: function() {
            var $element = this._element;
            setTimeout(function() {
                $element.removeClass('showing');
                setTimeout(function() {
                    $element.remove();
                }, 200);
            }, 0);
        },

        /**
         * show
         * 
         * @access  protected
         * @return  void
         */
        show: function() {
            var $element = this._element;
            setTimeout(function() {
                $element.addClass('showing');
            }, 0);
        }
    });
});
