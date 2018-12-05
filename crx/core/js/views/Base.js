window.DependencyLoader.push(['Base'], function() {

    /**
     * BaseView
     * 
     * @extends Base
     */
    window.BaseView = Base.extend({

        /**
         * _element
         * 
         * @access  protected
         * @var     null|jQuery (default: null)
         */
        _element: null,

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'BaseView')
         */
        _string: 'BaseView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @return  void
         */
        init: function(element) {
            this._element = element;
            this._super();
            this._setupTooltips();
        },

        /**
         * _setupTooltips
         * 
         * @note    addBack is required to ensure the this._element reference is
         *          also included in the search (if it has the tooltip attribute).
         * @access  protected
         * @return  void
         */
        _setupTooltips: function() {
            var $tooltips = this.find('[tooltip]').addBack('[tooltip]'),
                index,
                $tooltip,
                $element,
                data = {},
                direction = 'down';
            $tooltips.each(function(index, tooltip) {
                $tooltip = $(tooltip);
                if ($tooltip.attr('data-direction') !== undefined) {
                    direction = $tooltip.attr('data-direction');
                }
                data = {
                    content: $tooltip.attr('data-title'),
                    direction: direction
                };
                $element = DataUtils.render('Tooltip', data);
                $('body').append($element);
                new TooltipView($element, $tooltip, data);
            });
        },

        /**
         * find
         * 
         * @access  public
         * @param   String selector
         * @return  jQuery
         */
        find: function(selector) {
            var response = this._element.find(selector);
            return response;
        },

        /**
         * lookup
         * 
         * @access  public
         * @param   String selector
         * @return  jQuery
         */
        lookup: function(selector) {
            selector = '[lookup="' + (selector) + '"]';
            var response = this.find(selector);
            return response;
        },

        /**
         * getElement
         * 
         * @access  public
         * @return  jQuery
         */
        getElement: function() {
            return this._element;
        }
    });
});
