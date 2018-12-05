window.DependencyLoader.push(['BaseView'], function() {

    /**
     * HeaderView
     * 
     * @extends BaseView
     */
    window.HeaderView = BaseView.extend({

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'HeaderView')
         */
        _string: 'HeaderView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @return  void
         */
        init: function(element) {
            this._super(element);
            this._setSocialLinks();
        },

        /**
         * _setSocialLink
         * 
         * @access  protected
         * @param   String network
         * @return  void
         */
        _setSocialLink: function(network) {
            var $element = this.lookup(network),
                links = SettingsUtils.get('links'),
                social = links.social,
                link = social[network];
            $element.attr('href', link);
        },

        /**
         * _setSocialLinks
         * 
         * @access  protected
         * @return  void
         */
        _setSocialLinks: function() {
            this._setSocialLink('facebook');
            this._setSocialLink('twitter');
            this._setSocialLink('instagram');
            this._setSocialLink('youTube');
        },

        /**
         * show
         * 
         * @access  public
         * @var     Object
         */
        show: {

            /**
             * social
             * 
             * @access  public
             * @return  void
             */
            social: function() {
                var $social = this.find('.social');
                $social.removeClass('invisible');
            }
        }
    });
});
