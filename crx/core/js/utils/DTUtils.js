
/**
 * DTUtils
 * 
 * @abstract
 */
window.DTUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'DTUtils')
     */
    var __string = 'DTUtils';

    // Public
    return {

        /**
         * setup
         * 
         * @access  public
         * @var     Object
         */
        setup: {

            /**
             * moment
             * 
             * @access  public
             * @return  void
             */
            moment: function() {
                var podcastEpisodeTimestampOutputFormat = SettingsUtils.get('podcastEpisodeTimestampOutputFormat');
                moment.locale('en', {
                    calendar: {
                        lastDay: podcastEpisodeTimestampOutputFormat.lastDay,
                        sameDay: podcastEpisodeTimestampOutputFormat.sameDay,
                        lastWeek: podcastEpisodeTimestampOutputFormat.lastWeek,
                        sameElse: podcastEpisodeTimestampOutputFormat.sameElse
                    }
                });
            }
        },

        /**
         * relative
         * 
         * @access  public
         * @param   String timestamp
         * @return  String
         */
        relative: function(timestamp) {
            var formatted = moment(timestamp).fromNow();
            return formatted;
        },

        /**
         * timestamp
         * 
         * @access  public
         * @param   String timestamp
         * @return  String
         */
        timestamp: function(timestamp) {
            var formatted = moment(timestamp).calendar();
            return formatted;
        }
    };
})();
