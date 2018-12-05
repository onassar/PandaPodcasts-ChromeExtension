window.DependencyLoader.push(['BaseView'], function() {

    /**
     * PodcastView
     * 
     * @extends BaseView
     */
    window.PodcastView = BaseView.extend({

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
         * @var     String (default: 'PodcastView')
         */
        _string: 'PodcastView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @param   PodcastAccessor podcast
         * @return  void
         */
        init: function(element, podcast) {
            this._super(element);
            this._podcast = podcast;
            this._drawEpisodes();
            this._addListeners();
        },

        /**
         * _addListeners
         * 
         * @access  protected
         * @return  void
         */
        _addListeners: function() {
            var _this = this,
                podcast = this._podcast;
            podcast.on({
                'deselect': function(event) {
                    _this.hide();
                },
                'select': function(event, autoSelected) {
                    _this.show(autoSelected);
                }
            });
        },

        /**
         * _drawEpisodes
         * 
         * @access  public
         * @return  void
         */
        _drawEpisodes: function() {
            var episodes = this._podcast.getEpisodes(),
                $podcast = this._element,
                $episode;
            episodes.each(function(index, episode) {
                $episode = DataUtils.render('Episode', {
                    episode: episode
                });
                $podcast.find('.episodes').append($episode);
                $podcast.find('.episodes').append(
                    $podcast.find('.more')
                );
                new EpisodeView($episode, episode);
            });
        },

        /**
         * hide
         * 
         * @access  public
         * @return  void
         */
        hide: function() {
            var $element = this._element;
            $element.addClass('hidden');
        },

        /**
         * show
         * 
         * @access  public
         * @param   undefined|Boolean autoSelected (default: false)
         * @return  void
         */
        show: function(autoSelected) {
            autoSelected = DataUtils.getDefaultValue(autoSelected, false);
            var podcast = this._podcast,
                $element = this._element;
            PandaPodcastsPopup.get.podcasts().deselect(podcast);
            $element.removeClass('hidden');
            var episodes = this._podcast.getEpisodes();
            if (episodes.length() === 0) {
                var $empty = this._element.find('div.empty'),
                    $episodes = this._element.find('div.episodes');
                $empty.removeClass('hidden');
                $episodes.addClass('hidden');
            }
        }
    });
});
