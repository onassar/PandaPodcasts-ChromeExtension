window.DependencyLoader.push(['BaseModel'], function() {

    /**
     * EpisodeModel
     * 
     * @extends BaseModel
     */
    window.EpisodeModel = BaseModel.extend({

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'EpisodeModel')
         */
        _string: 'EpisodeModel',

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
         * _getEpisodeDataViaXPath
         * 
         * @access  protected
         * @param   jQuery $episode
         * @param   PodcastAccessor podcast
         * @return  null|Object
         */
        _getEpisodeDataViaXPath: function($episode, podcast) {
            var timestamp = this._runXPathExpression($episode, podcast, 'timestamp'),
                link = this._runXPathExpression($episode, podcast, 'link'),
                title = this._runXPathExpression($episode, podcast, 'title'),
                description = this._runXPathExpression($episode, podcast, 'description'),
                thumb = this._runXPathExpression($episode, podcast, 'thumb'),
                data = {
                    key: md5(link),
                    title: title,
                    timestamp: timestamp,
                    link: link,
                    description: description,
                    thumb: thumb
                };
            var fallbackEpisodeData = this._getFallbackEpisodeData(podcast),
                fallback = fallbackEpisodeData.link;
            if (link === fallback) {
                return null;
            }
            return data;
        },

        /**
         * _getEpisodeElementsViaXPath
         * 
         * @access  protected
         * @param   jQuery $element
         * @param   PodcastAccessor podcast
         * @return  Object
         */
        _getEpisodeElementsViaXPath: function($element, podcast) {
            var xPathExpressions = podcast.getXPathExpressions(),
                $episodes = $element.xpath(xPathExpressions.episodes);
            return $episodes;
        },

        /**
         * _getMarkupElement
         * 
         * @see     https://api.jquery.com/jquery.parsehtml/
         * @access  protected
         * @param   String content
         * @return  jQuery
         */
        _getMarkupElement: function(content) {
            var markup = StringUtils.decode(content),
                $element = $(jQuery.parseHTML('<div></div>'));
            $element.append($(markup));
            return $element;
        },

        /**
         * _getEpisodesFromBody
         * 
         * @access  protected
         * @param   String content
         * @param   PodcastAccessor podcast
         * @return  Array
         */
        _getEpisodesFromBody: function(content, podcast) {
            var $element = this._getMarkupElement(content),
                index,
                $episode,
                data,
                episodes = [],
                $episodes = this._getEpisodeElementsViaXPath($element, podcast);
            for (index in $episodes) {
                if (isNaN(index) === true) {
                    continue;
                }
                $episode = $episodes.eq(index);
                data = this._getEpisodeDataViaXPath($episode, podcast);
                if (data === null) {
                    continue;
                }
                episodes.push(data);
            }
            return episodes;
        },

        /**
         * _getFallbackEpisodeData
         * 
         * @access  protected
         * @param   PodcastAccessor podcast
         * @return  Object
         */
        _getFallbackEpisodeData: function(podcast) {
            var defaultFallbackEpisodeData = this._getDefaultFallbackEpisodeData(),
                fallbackEpisodeData = podcast.get('fallbackEpisodeData');
            if (fallbackEpisodeData === undefined) {
                return defaultFallbackEpisodeData;
            }
            fallbackEpisodeData = DataUtils.merge(
                defaultFallbackEpisodeData,
                fallbackEpisodeData
            );
            return fallbackEpisodeData;
        },

        /**
         * _getDefaultFallbackEpisodeData
         * 
         * @access  protected
         * @return  Object
         */
        _getDefaultFallbackEpisodeData: function() {
            var fallbackEpisodeData = SettingsUtils.get('fallbackEpisodeData');
            return fallbackEpisodeData;
        },

        /**
         * _runXPathExpression
         * 
         * @access  protected
         * @param   jQuery $element
         * @param   String key
         * @param   PodcastAccessor podcast
         * @return  mixed
         */
        _runXPathExpression: function($element, podcast, key) {
            var fallbackEpisodeData = this._getFallbackEpisodeData(podcast),
                xPathExpressions = podcast.getXPathExpressions(),
                expression = xPathExpressions[key],
                fallback = fallbackEpisodeData[key];
            try {
                var response = $element.xpath(expression),
                    trimmed = response[0].trim();
                if (trimmed === '') {
                    return fallback;
                }
                return trimmed;
            } catch (err) {
                LogUtils.log(err);
                return fallback;
            }
        },

        /**
         * list
         * 
         * @access  public
         * @param   String podcastKey
         * @return  Promise
         */
        list: function(podcastKey) {
            var _this = this,
                podcast = DataUtils.getAccessor(podcastKey),
                url = podcast.getEpisodesLookupUrl(),
                collection = new EpisodesCollection();
            return RequestUtils.url.json(url).then(function(response) {
                var file = response.body.data.files[0],
                    body = file.content,
                    episodes = _this._getEpisodesFromBody(body, podcast);
                collection.map(episodes);
                return collection;
            }).catch(function(err) {
                LogUtils.log(err);
                return collection;
            });
        }
    });
});
