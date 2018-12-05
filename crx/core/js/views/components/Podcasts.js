window.DependencyLoader.push(['BaseView'], function() {

    /**
     * PodcastsView
     * 
     * @extends BaseView
     */
    window.PodcastsView = BaseView.extend({

        /**
         * _podcastss
         * 
         * @access  protected
         * @var     Array (default: [])
         */
        _podcasts: [],

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'PodcastsView')
         */
        _string: 'PodcastsView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @return  void
         */
        init: function(element) {
            this._super(element);
            this._drawPodcasts();
        },

        /**
         * _drawPodcasts
         * 
         * @access  protected
         * @return  void
         */
        _drawPodcasts: function() {
            var podcasts = PandaPodcastsPopup.get.podcasts(),
                $podcasts = this._element,
                $podcast;
            podcasts.each(function(index, podcast) {
                $podcast = DataUtils.render('Podcast', {
                    podcast: podcast
                });
                $podcasts.append($podcast);
                new PodcastView($podcast, podcast);
            });
        },

        /**
         * getPodcasts
         * 
         * @access  public
         * @return  Array
         */
        getPodcasts: function() {
            return this._podcasts;
        }
    });
});
