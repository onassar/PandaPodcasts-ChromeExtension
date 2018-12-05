window.DependencyLoader.push(['BaseAccessor', 'PodcastModel'], function() {

    /**
     * PodcastAccessor
     * 
     * @extends BaseAccessor
     */
    window.PodcastAccessor = BaseAccessor.extend({

        /**
         * _episodes
         * 
         * @access  protected
         * @var     null|EpisodesCollection
         */
        _episodes: null,

        /**
         * _model
         * 
         * @access  protected
         * @var     Model
         */
        _model: DataUtils.get.model('Podcast'),

        /**
         * _selected
         * 
         * @access  protected
         * @var     Boolea (default: false)
         */
        _selected: false,

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'PodcastAccessor')
         */
        _string: 'PodcastAccessor',

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
         * @return  void
         */
        deselect: function() {
            if (this._selected === true) {
                this._selected = false;
                this.triggerHandler('deselect');
            }
        },

        /**
         * getEpisodes
         * 
         * @access  public
         * @return  EpisodesCollection
         */
        getEpisodes: function() {
            var episodes = this._episodes;
            return episodes;
        },

        /**
         * getEpisodesLookupUrl
         * 
         * @access  public
         * @return  String
         */
        getEpisodesLookupUrl: function() {
            var url = SettingsUtils.getRemoteProxyURL(),
                data = {
                    bust: SettingsUtils.getCloudFlareCacheBustString(),
                    cfCache: SettingsUtils.getCloudFlareCacheDuration(),
                    data: {
                        urls: [
                            this._data.link
                        ]
                    }
                },
                query = DataUtils.serialize(data);
            url = (url) + '?' + (query);
            return url;
        },

        /**
         * getXPathExpressions
         * 
         * @see     https://github.com/ilinsky/jquery-xpath
         * @see     https://stackoverflow.com/questions/1604471/how-can-i-find-an-element-by-css-class-with-xpath
         * @see     https://stackoverflow.com/questions/4531995/getting-attribute-using-xpath
         * @access  public
         * @return  Object
         */
        getXPathExpressions: function() {
            var defautXPathExpressions = SettingsUtils.getDefaultXPathExpressions(),
                podcastXPathExpressions = this._data.xPathExpressions || {},
            podcastXPathExpressions = DataUtils.merge(
                defautXPathExpressions,
                podcastXPathExpressions
            );
            return podcastXPathExpressions;
        },

        /**
         * loadEpisodes
         * 
         * @access  public
         * @return  Promise
         */
        loadEpisodes: function() {
            var model = DataUtils.get.model('Episode'),
                key = this._data.key,
                podcast = DataUtils.getAccessor(key),
                _this = this,
                promise = model.list(key).then(function(episodes) {
                    _this._episodes = episodes;
                    _this._episodes.setPodcast(podcast);
                    _this._episodes.preloadThumbs();
                    if (_this._data.episodes.reverse === true) {
                        _this._episodes.reverse();
                    }
                    return episodes;
                }).catch(function(err) {
                    LogUtils.log(err);
                });
            return promise;
        },

        /**
         * postedToday
         * 
         * @access  public
         * @return  Boolean
         */
        postedToday: function() {
            var postedToday = false;
            this._episodes.each(function(index, episode) {
                if (episode.postedToday() === true) {
                    postedToday = true;
                }
            });
            return postedToday;
        },

        /**
         * postedYesterday
         * 
         * @access  public
         * @return  Boolean
         */
        postedYesterday: function() {
            var postedYesterday = false;
            this._episodes.each(function(index, episode) {
                if (episode.postedYesterday() === true) {
                    postedYesterday = true;
                }
            });
            return postedYesterday;
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
            if (this._selected === false) {
                this._selected = true;
                this.triggerHandler('select', [autoSelected]);
            }
        }
    });
});
