
/**
 * NotificationUtils
 * 
 * @see     https://developer.chrome.com/apps/notifications
 * @abstract
 */
window.NotificationUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'NotificationUtils')
     */
    var __string = 'NotificationUtils';

    /**
     * Methods
     * 
     */

    /**
     * __getIconURL
     * 
     * @access  private
     * @return  String
     */
    var __getIconURL = function() {
        var manifest = SettingsUtils.getManifest(),
            icons = manifest.icons,
            path = icons[128],
            url = chrome.runtime.getURL(path);
        return url;
    };

    /**
     * Methods
     * 
     */

    // Public
    return {

        /**
         * show
         * 
         * @access  public
         * @return  void
         */
        show: function(title, message) {
            var url = __getIconURL();
            chrome.notifications.create('notification', { 
                type: 'basic',
                iconUrl: url,
                title: title,
                eventTime: (Date.now() / 1000)  + (2 * 1000),
                message: message
            });
        }
    };
})();
