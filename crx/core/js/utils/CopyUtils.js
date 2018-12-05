
/**
 * CopyUtils
 * 
 * @abstract
 */
window.CopyUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'CopyUtils')
     */
    var __string = 'CopyUtils';

    /**
     * Methods
     * 
     */

    /**
     * __getPageSingleton
     * 
     * @access  private
     * @return  Object
     */
    var __getPageSingleton = function() {
        if (window.PandaPodcastsPopup === undefined) {
            return window.PandaPodcastsBackground;
        }
        return window.PandaPodcastsPopup;
    };

    // Public
    return {

        /**
         * get
         * 
         * @access  public
         * @param   String key
         * @var     String
         */
        get: function(key) {
            var copy = __getPageSingleton().get.copy().find(key),
                value = copy.get('value');
            return value;
        }
    };
})();
