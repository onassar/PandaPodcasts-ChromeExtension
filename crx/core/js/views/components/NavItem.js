window.DependencyLoader.push(['BaseView'], function() {

    /**
     * NavItemView
     * 
     * @extends BaseView
     */
    window.NavItemView = BaseView.extend({

        /**
         * _podcast
         * 
         * @access  protected
         * @var     null|PodcastAccessor (default: null)
         */
        _podcast: null,

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'NavItemView')
         */
        _string: 'NavItemView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @param   PodcastAccessor podcast
         * @return  void
         */
        init: function(element, podcast) {
            this._podcast = podcast;
            this._super(element);
            this._addListeners();
        },

        /**
         * _addListeners
         * 
         * @access  protected
         * @return  void
         */
        _addListeners: function() {
            var podcast = this._podcast;
            this._element.on({
                'click': function(event) {
                    event.preventDefault();
                    podcast.select();
                }
            });
            var _this = this;
            podcast.on({
                'deselect': function(event) {
                    _this.deselect();
                },
                'select': function(event, autoSelected) {
                    _this.select(autoSelected);
                }
            });
        },

        /**
         * deselect
         * 
         * @access  public
         * @return  void
         */
        deselect: function() {
            var $element = this._element;
            $element.removeClass('active');
            $element.find('.badge').addClass('invisible');
        },

        /**
         * select
         * 
         * @access  public
         * @param   undefined|Boolean autoSelected (default: false)
         * @return  void
         */
        select: function(autoSelected) {
            autoSelected = DataUtils.getDefaultValue(autoSelected, false);
            var podcast = this._podcast,
                $element = this._element;
            PandaPodcastsPopup.get.podcasts().deselect(podcast);
            $element.addClass('active');
            if (autoSelected === false) {
                $element.find('.badge').addClass('invisible');
            }
        }
    });
});
