
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
     * __notifications
     * 
     * @access  private
     * @var     Object (default: {})
     */
    var __notifications = {};

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
     * __addClearNotificationsListener
     * 
     * @see     https://developer.chrome.com/apps/notifications
     * @access  private
     * @return  void
     */
    var __addClearNotificationsListener = function() {
        chrome.notifications.onClicked.addListener(function(notificationId) {
            var notification = __notifications[notificationId],
                url = notification.url;
            window.open(url);
            chrome.notifications.clear(notificationId);
        });
    };

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
         * init
         * 
         * @access  public
         * @return  void
         */
        init: function() {
            __addClearNotificationsListener();
        },

        /**
         * show
         * 
         * @see     https://developer.chrome.com/apps/notifications
         * @access  public
         * @param   String title
         * @param   String message
         * @param   String url
         * @return  void
         */
        show: function(title, message, url) {
            var iconURL = __getIconURL(),
                notificationId = DataUtils.getRandomString();
            __notifications[notificationId] = {
                url: url
            };
            notification = chrome.notifications.create(notificationId, {
                type: 'basic',
                iconUrl: iconURL,
                title: title,
                message: message
            });
        }
    };
})();

// Let's do this!
NotificationUtils.init();
