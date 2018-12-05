
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
            path = '/onassar/PandaProjects-ChromeExtension/crx/apps/' + (shortName) + '/docs/installed.md',
            url = 'https://' + (host) + (path);
        chrome.tabs.create({
            url: url
        });
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
            var load = async function() {
                var promises = [
                    await LogUtils.log('Background: Start'),
                    await __addInstallEventListener(),
                    await __loadSettings(),
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
