window.DependencyLoader.push(['BaseView'], function() {

    /**
     * NavView
     * 
     * @extends BaseView
     */
    window.NavView = BaseView.extend({

        /**
         * _navItems
         * 
         * @access  protected
         * @var     Array (default: [])
         */
        _navItems: [],

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'NavView')
         */
        _string: 'NavView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @return  void
         */
        init: function(element) {
            this._super(element);
            this._drawNavItems();
        },

        /**
         * _drawNavItems
         * 
         * @access  protected
         * @return  void
         */
        _drawNavItems: function() {
            var podcasts = PandaPodcastsPopup.get.podcasts(),
                $nav = this._element,
                $navItem;
            podcasts.each(function(index, podcast) {
                $navItem = DataUtils.render('NavItem', {
                    podcast: podcast
                });
                $nav.append($navItem);
                new NavItemView($navItem, podcast);
            });
        }
    });
});
