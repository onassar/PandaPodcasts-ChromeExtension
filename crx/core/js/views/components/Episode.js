window.DependencyLoader.push(['BaseView'], function() {

    /**
     * EpisodeView
     * 
     * @extends BaseView
     */
    window.EpisodeView = BaseView.extend({

        /**
         * _episode
         * 
         * @access  protected
         * @var     null|EpisodeAccessor (default: null)
         */
        _episode: null,

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'EpisodeView')
         */
        _string: 'EpisodeView',

        /**
         * init
         * 
         * @access  public
         * @param   jQuery element
         * @param   EpisodeAccessor episode
         * @return  void
         */
        init: function(element, episode) {
            this._super(element);
            this._episode = episode;
        }
    });
});
