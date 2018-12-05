
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
                moment.locale('en', {
                    calendar: {
                        lastDay: '[Yesterday]',
                        sameDay: '[Today]',
                        // lastWeek: '[Last] dddd',
                        lastWeek: 'dddd',
                        sameElse: 'MMM. D'
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
            return moment(timestamp).fromNow();
        },

        /**
         * timestamp
         * 
         * @access  public
         * @param   String timestamp
         * @return  String
         */
        timestamp: function(timestamp) {
            return moment(timestamp).calendar();
        }
    };
})();
