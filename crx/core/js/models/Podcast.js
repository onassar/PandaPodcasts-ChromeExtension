window.DependencyLoader.push(['BaseModel'], function() {

    /**
     * PodcastModel
     * 
     * @extends BaseModel
     */
    window.PodcastModel = BaseModel.extend({

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'PodcastModel')
         */
        _string: 'PodcastModel',

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
         * list
         * 
         * @access  public
         * @return  Promise
         */
        list: function() {
            var url = SettingsUtils.getRemotePodcastsURL(),
                collection = new PodcastsCollection();
            return RequestUtils.url.json(url).then(function(response) {
                var podcasts = response.body;
                collection.map(podcasts);
                collection.reduce(function(podcast) {
                    return podcast.get('show') === false;
                });
                return collection;
            }).catch(function(err) {
                LogUtils.log(err);
                return collection;
            });
        }
    });
});
