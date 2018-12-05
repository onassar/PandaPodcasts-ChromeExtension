window.DependencyLoader.push(['BaseCollection', 'PodcastModel'], function() {

    /**
     * PodcastsCollection
     * 
     * @extends BaseCollection
     */
    window.PodcastsCollection = BaseCollection.extend({

        /**
         * _model
         * 
         * @access  protected
         * @var     Model
         */
        _model: DataUtils.get.model('Podcast'),

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'PodcastsCollection')
         */
        _string: 'PodcastsCollection',

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
         * deselect
         * 
         * @access  public
         * @param   PodcastAccessor exception
         * @return  void
         */
        deselect: function(exception) {
            var exceptions = [exception];
            this.each(function(index, podcast) {
                podcast.deselect();
            }, exceptions);
        },

        /**
         * getNewest
         * 
         * @access  public
         * @return  Array
         */
        getNewest: function() {
            var newest = [];
            this.each(function(index, podcast) {
                if (podcast.postedToday() === true) {
                    newest.push(podcast);
                } else if (podcast.postedYesterday() === true) {
                    newest.push(podcast);
                }
            });
            return newest;
        },

        /**
         * loadEpisodes
         * 
         * @access  public
         * @return  Promise
         */
        loadEpisodes: function() {
            var promises = [],
                promise,
                index, podcast;
            for (index in this._accessors) {
                podcast = this._accessors[index];
                promise = podcast.loadEpisodes();
                promises.push(promise);
            }
            promise = Promise.all(promises);
            return promise;
        }
    });
});
