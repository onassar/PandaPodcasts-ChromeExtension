
/**
 * PandaPodcastsBackground
 * 
 * @abstract
 */
window.PandaPodcastsBackground = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __collections
     * 
     * @access  private
     * @var     Object (default: {})
     */
    var __collections = {};

    /**
     * Methods
     * 
     */

    /**
     * __addClearBadgeListener
     * 
     * @access  private
     * @return  void
     */
    var __addClearBadgeListener = function() {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request.action == 'clearBadge') {
                    __clearBadge();
                }
            }
        );
    };

    /**
     * __addInstallEventListener
     * 
     * @access  private
     * @return  void
     */
    var __addInstallEventListener = function() {
        chrome.runtime.onInstalled.addListener(
            function(details) {
                if (details.reason === 'install') {
                    __openInstalledPage();
                }
            }
        );
    };

    /**
     * __clearBadge
     * 
     * @access  private
     * @return  void
     */
    var __clearBadge = function() {
        chrome.browserAction.setBadgeText({
            'text': ''
        });
    };

    /**
     * __loadPodcasts
     * 
     * @access  private
     * @return  Promise
     */
    var __loadPodcasts = function() {
        var model = DataUtils.get.model('Podcast'),
            promise = model.list().then(function(podcasts) {
                __collections.podcasts = podcasts;
                var promise = podcasts.loadEpisodes();
                return promise;
            }).catch(function(err) {
                LogUtils.log(err);
            });
        return promise;
    };

    /**
     * __loadSettings
     * 
     * @access  private
     * @return  Promise
     */
    var __loadSettings = function() {
        var model = DataUtils.get.model('Setting'),
            promise = model.list(true).then(function(core) {
                return core;
            }).then(function(core) {
                return model.list(false).then(function(app) {
                    var collection = new SettingsCollection(),
                        objects = core.objects().concat(
                            app.objects()
                        );
                    collection.map(objects);
                    __collections.settings = collection;
                });
            }).catch(function(err) {
                LogUtils.log(err);
            });
        return promise;
    };

    /**
     * __openInstalledPage
     * 
     * @access  private
     * @return  void
     */
    var __openInstalledPage = function() {
        var manifest = SettingsUtils.getManifest(),
            shortName = manifest.short_name,
            host = 'github.com',
            path = '/onassar/PandaPodcasts-ChromeExtension/blob/stable/crx/apps/' + (shortName) + '/docs/installed.md',
            url = 'https://' + (host) + (path);
        chrome.tabs.create({
            url: url
        });
    };

    /**
     * __setBadge
     * 
     * @access  private
     * @return  void
     */
    var __setBadge = function() {
        var badgeColor = SettingsUtils.get('notificationBadgeColor');
        chrome.browserAction.setBadgeText({
            'text': ' '
        });
        chrome.browserAction.setBadgeBackgroundColor({
            'color': badgeColor
        });
    };

    /**
     * __setupNotificationInterval
     * 
     * @access  private
     * @return  void
     */
    var __setupNotificationInterval = function() {
        var interval = SettingsUtils.get('notificationsInterval');
        interval *= 1000;
        setInterval(function() {
            __loadPodcasts().then(function() {
                __showPossibleNotification();
                delete __collections.podcasts;
            });
        }, interval);
    };

    /**
     * __showPossibleNotification
     * 
     * @access  private
     * @return  Boolean
     */
    var __showPossibleNotification = function() {
        __clearBadge();
        var podcasts = __collections.podcasts.all(),
            index,
            podcast;
        for (index in podcasts) {
            podcast = podcasts[index];
            var key = podcast.get('key'),
                value = CacheUtils.get(key),
                episode = podcast.getEpisodes().first();
            if (value === null) {
                value = episode.get('key');
                CacheUtils.set(key, value, 0);
                continue;
            }
            if (value === episode.get('key')) {
                continue;
            }
            __setBadge();
            podcast.showNotification();
            return true;
        }
        return false;
    };

    // Public
    return {

        /**
         * init
         * 
         * @access  public
         * @return  void
         */
        init: function() {
            console.log('PandaPodcastsBackground');
            __addClearBadgeListener();
            var load = async function() {
                var promises = [
                    await LogUtils.log('Background: Start'),
                    await __addInstallEventListener(),
                    await __loadSettings(),
                    await __setupNotificationInterval(),
                    await LogUtils.log('Background: Complete')
                ];
                Promise.all(promises);
            };
            load.apply(PandaPodcastsBackground);
        },

        /**
         * get
         * 
         * @access  public
         * @var     Object
         */
        get: {

            /**
             * settings
             * 
             * @access  public
             * @return  SettingsCollection
             */
            settings: function() {
                var collection = __collections.settings;
                return collection;
            }
        }
    };
})();

// Let's do this!
DependencyLoader.load();
PandaPodcastsBackground.init();
