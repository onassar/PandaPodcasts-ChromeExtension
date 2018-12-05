
/**
 * SettingsUtils
 * 
 * @abstract
 */
window.SettingsUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'SettingsUtils')
     */
    var __string = 'SettingsUtils';

    /**
     * Methods
     * 
     */

    /**
     * __development
     * 
     * @access  private
     * @return  Boolean
     */
    var __development = function() {
        var manifest = __getManifest();
        if (manifest.update_url === undefined) {
            return true;
        }
        return false;
    };

    /**
     * __getManifest
     * 
     * @access  private
     * @return  Object
     */
    var __getManifest = function() {
        var manifest = chrome.runtime.getManifest();
        return manifest;
    };

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

    /**
     * __getSettingValueByKey
     * 
     * @access  private
     * @param   String key
     * @return  mixed
     */
    var __getSettingValueByKey = function(key) {
        var value = __getPageSingleton().get.settings().find('key', key).get('value');
        return value;
    };

    // Public
    return {

        /**
         * development
         * 
         * @access  public
         * @var     Boolean
         */
        development: function() {
            return __development();
        },

        /**
         * get
         * 
         * @access  public
         * @param   String key
         * @return  mixed
         */
        get: function(key) {
            var setting = __getPageSingleton().get.settings().find('key', key),
                value = setting.get('value');
            return value;
        },

        /**
         * getCloudFlareCacheBustString
         * 
         * @access  public
         * @var     String
         */
        getCloudFlareCacheBustString: function() {
            var str = __getSettingValueByKey('cloudFlareCacheBustString');
            return str;
        },

        /**
         * getCloudFlareCacheDuration
         * 
         * @access  public
         * @var     String
         */
        getCloudFlareCacheDuration: function() {
            var duration = __getSettingValueByKey('cloudFlareCacheDuration');
            return duration;
        },

        /**
         * getDefaultXPathExpressions
         * 
         * @access  public
         * @var     Object
         */
        getDefaultXPathExpressions: function() {
            var expressions = __getSettingValueByKey('defaultXPathExpressions');
            return expressions;
        },

        /**
         * getHost
         * 
         * @access  public
         * @param   String key
         * @var     String
         */
        getHost: function(key) {
            var hosts = __getSettingValueByKey('hosts'),
                host = hosts[key];
            return host;
        },

        /**
         * getImageResizingService
         * 
         * @access  public
         * @var     String
         */
        getImageResizingService: function(key) {
            var imageResizingService = __getSettingValueByKey('imageResizingService');
            return imageResizingService;
        },

        /**
         * getLink
         * 
         * @access  public
         * @param   String key
         * @var     mixed
         */
        getLink: function(key) {
            var links = __getSettingValueByKey('links'),
                link = links[key];
            return link;
        },

        /**
         * getLoadingScreenSleepDelay
         * 
         * @access  public
         * @var     Number
         */
        getLoadingScreenSleepDelay: function() {
            var delay = __getSettingValueByKey('loadingScreenSleepDelay');
            return delay;
        },

        /**
         * getManifest
         * 
         * @access  public
         * @var     Object
         */
        getManifest: function() {
            var manifest = __getManifest();
            return manifest;
        },

        /**
         * getRemoteCopyURL
         * 
         * @access  public
         * @var     String
         */
        getRemoteCopyURL: function() {
            var url = __getPageSingleton().get.settings().copy();
            return url;
        },

        /**
         * getRemoteFactsURL
         * 
         * @access  public
         * @var     String
         */
        getRemoteFactsURL: function() {
            var url = __getPageSingleton().get.settings().facts();
            return url;
        },

        /**
         * remote
         * 
         * @access  public
         * @param   String key
         * @return  String
         */
        remote: function(key) {
            var url = __getPageSingleton().get.settings().remote(key);
            return url;
        },

        /**
         * getRemotePodcastsURL
         * 
         * @access  public
         * @var     String
         */
        getRemotePodcastsURL: function() {
            var url = __getPageSingleton().get.settings().podcasts();
            return url;
        },

        /**
         * getRemoteProxyURL
         * 
         * @access  public
         * @var     String
         */
        getRemoteProxyURL: function() {
            var url = __getPageSingleton().get.settings().proxy();
            return url;
        },

        /**
         * role
         * 
         * @access  public
         * @var     String
         */
        role: function() {
            if (__development() === true) {
                return 'development';
            }
            return 'production';
        },

        /**
         * templates
         * 
         * @access  public
         * @var     Array
         */
        templates: function() {
            var templates = __getSettingValueByKey('templates');
            return templates;
        },

        /**
         * version
         * 
         * @access  public
         * @var     String
         */
        version: function() {
            var manifest = __getManifest(),
                version = manifest.version;
            return version;
        }
    };
})();
