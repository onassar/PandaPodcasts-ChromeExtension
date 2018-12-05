window.DependencyLoader.push(['BaseModalView'], function() {

    /**
     * AboutModalView
     * 
     * @extends BaseModalView
     */
    window.AboutModalView = BaseModalView.extend({

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'AboutModalView')
         */
        _string: 'AboutModalView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @return  void
         */
        init: function(element) {
            this._super(element);
        }
    });
});
