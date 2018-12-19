window.DependencyLoader.push(['BaseAccessor', 'EpisodeModel'], function() {

    /**
     * EpisodeAccessor
     * 
     * @extends BaseAccessor
     */
    window.EpisodeAccessor = BaseAccessor.extend({

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
         * @var     String (default: 'EpisodeAccessor')
         */
        _string: 'EpisodeAccessor',

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
         * _getTimestampFormat
         * 
         * @see     https://momentjs.com/docs/#/displaying/format/
         * @access  protected
         * @return  String
         */
        _getTimestampFormat: function() {
            var podcast = this.getPodcast(),
                timestampFormat = podcast.get('timestampFormat');
            if (timestampFormat === undefined) {
                var format = SettingsUtils.get('defaultPodcastEpisodeTimestampFormat');
                return format;
            }
            return timestampFormat;
        },

        /**
         * getDescription
         * 
         * @access  public
         * @return  String
         */
        getDescription: function() {
            var description = this._data.description;
            description = description.trim();
            return description;
        },

        /**
         * getFormattedTimestamp
         * 
         * @access  public
         * @return  String
         */
        getFormattedTimestamp: function() {
            var timestamp = this._data.timestamp,
                format = this._getTimestampFormat(),
                formatted = moment(timestamp, format).calendar();
            return formatted;
        },

        /**
         * getLink
         * 
         * @access  public
         * @return  String
         */
        getLink: function() {
            var link = this._data.link;
            if (link.match(/^http/) === null) {
                var base = SettingsUtils.getLink('base'),
                    url = (base) + (link);
                return url;
            }
            return link;
        },

        /**
         * getPodcast
         * 
         * @access  public
         * @return  PodcastAccessor
         */
        getPodcast: function() {
            var podcast = this._references.podcast;
            return podcast;
        },

        /**
         * getThumb
         * 
         * @see     https://cloudinary.com/console
         * @access  public
         * @return  String
         */
        getThumb: function() {
            var remoteURL = this._data.thumb,
                url = ImageUtils.url.fetch(remoteURL);
            return url;
        },

        /**
         * getTitle
         * 
         * @access  public
         * @return  String
         */
        getTitle: function() {
            var title = this._data.title;
            title = title.replace(/^"/, '');
            title = title.replace(/^“/, '');
            title = title.replace(/"$/, '');
            title = title.replace(/”$/, '');
            title = title.trim();
            return title;
        },

        /**
         * postedToday
         * 
         * @access  public
         * @return  Boolean
         */
        postedToday: function() {
            var formatted = this.getFormattedTimestamp();
            if (formatted === 'Today') {
                return true;
            }
            return false;
        },

        /**
         * postedYesterday
         * 
         * @access  public
         * @return  Boolean
         */
        postedYesterday: function() {
            var formatted = this.getFormattedTimestamp();
            if (formatted === 'Yesterday') {
                return true;
            }
            return false;
        },

        /**
         * preloadThumb
         * 
         * @access  public
         * @return  void
         */
        preloadThumb: function() {
            var thumb = this.getThumb(),
                image = new Image();
            image.src == thumb;
        },

        /**
         * showTimestamp
         * 
         * @access  public
         * @return  Boolean
         */
        showTimestamp: function() {
            var timestamp = this._data.timestamp;
            if (timestamp === '') {
                return false;
            }
            if (timestamp === 'unknown') {
                return false;
            }
            return true;
        }
    });
});
