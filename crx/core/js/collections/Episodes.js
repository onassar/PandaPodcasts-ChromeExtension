window.DependencyLoader.push(['BaseCollection', 'EpisodeModel'], function() {

    /**
     * EpisodesCollection
     * 
     * @extends BaseCollection
     */
    window.EpisodesCollection = BaseCollection.extend({

        /**
         * _model
         * 
         * @access  protected
         * @var     Model
         */
        _model: DataUtils.get.model('Episode'),

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'EpisodesCollection')
         */
        _string: 'EpisodesCollection',

        /**
         * init
         * 
         * @access  public
         * @param   Object data
         * @return  void
         */
        init: function(data) {
            this._super(data);
        },

        /**
         * preloadThumbs
         * 
         * @throws  Error
         * @access  public
         * @return  Boolean
         */
        preloadThumbs: function() {
            var first = this.first();
            if (first === undefined) {
                var msg = 'First episode in collection could not be found';
                throw new Error(msg);
            }
            var podcast = first.getPodcast();
            if (podcast.get('key') !== 'psa') {
                return false;
            }
            this.each(function(index, episode) {
                episode.preloadThumb();
            });
            return true;
        },

        /**
         * setPodcast
         * 
         * @access  public
         * @param   PodcastAccessor podcast
         * @return  void
         */
        setPodcast: function(podcast) {
            this.each(function(index, episode) {
                episode.setReference('podcast', podcast);
            });
        }
    });
});
