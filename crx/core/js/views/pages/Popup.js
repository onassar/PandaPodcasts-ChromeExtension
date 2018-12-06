window.DependencyLoader.push(['BaseView'], function() {

    /**
     * PopupPageView
     * 
     * @extends BaseView
     */
    window.PopupPageView = BaseView.extend({

        /**
         * _header
         * 
         * @access  protected
         * @var     null|HeaderView (default: null)
         */
        _header: null,

        /**
         * _nav
         * 
         * @access  protected
         * @var     null|NavView (default: null)
         */
        _nav: null,

        /**
         * _podcasts
         * 
         * @access  protected
         * @var     Array (default: [])
         */
        _podcasts: [],

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'PopupPageView')
         */
        _string: 'PopupPageView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @return  void
         */
        init: function(element) {
            this._super(element);
            DTUtils.setup.moment();
            this._addAboutListener();
            this._setupHeader();
            this._drawNav();
            this._drawPodcasts();
            this._showHideDevelopmentElements();
        },

        /**
         * _addAboutListener
         * 
         * @access  protected
         * @return  void
         */
        _addAboutListener: function() {
            this.lookup('about').on({
                'click': function(event) {
                    event.preventDefault();
                    var $element = DataUtils.render('AboutModal');
                    $('body').append($element);
                    var view = new BaseModalView($element);
                    view.show();
                }
            });
        },

        /**
         * _drawNav
         * 
         * @access  protected
         * @return  void
         */
        _drawNav: function() {
            var $nav = DataUtils.render('Nav');
            this._nav = new NavView($nav);
            this.find('div.content > div.podcasts').append($nav);
        },

        /**
         * _drawPodcasts
         * 
         * @access  protected
         * @return  void
         */
        _drawPodcasts: function() {
            var $podcasts = DataUtils.render('Podcasts');
            this._podcasts = new PodcastsView($podcasts);
            this.find('div.content > div.podcasts').append($podcasts);
        },

        /**
         * _setupHeader
         * 
         * @access  protected
         * @return  void
         */
        _setupHeader: function() {
            var $header = this.find('header');
            this._header = new HeaderView($header);
        },

        /**
         * _showHideDevelopmentElements
         * 
         * @access  protected
         * @return  void
         */
        _showHideDevelopmentElements: function() {
            if (SettingsUtils.development() === true) {
                this.find('[development="1"]').removeClass('hidden');
            }
        },

        /**
         * getNav
         * 
         * @access  public
         * @return  NavView
         */
        getNav: function() {
            return this._nav;
        },

        /**
         * getCollection
         * 
         * @access  public
         * @return  PodcastsView
         */
        getCollection: function() {
            return this._podcasts;
        },

        /**
         * getPodcasts
         * 
         * @access  public
         * @return  PodcastsView
         */
        getPodcasts: function() {
            return this._podcasts;
        },

        /**
         * hide
         * 
         * @access  public
         * @var     Object
         */
        hide: {

            /**
             * podcasts
             * 
             * @access  public
             * @return  void
             */
            podcasts: function() {
                var index,
                    podcast,
                    podcasts = this._podcasts.getPodcasts();
                for (index in podcasts) {
                    podcast = podcasts[index];
                    podcast.hide();
                }
            }
        },

        /**
         * show
         * 
         * @access  public
         * @return  void
         */
        show: function() {
            var $loader = this.find('.loader'),
                $podcasts = this.find('div.content > div.podcasts');
            $loader.addClass('hidden');
            $podcasts.removeClass('hidden');
            this._header.show.social.apply(this._header);
        }
    });
});
