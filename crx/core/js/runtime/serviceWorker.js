
/**
 * /core/js/runtime/serviceWorker.js
 * 
 */
(function() {

    /**
     * Setup
     * 
     */
    self = self || {};
    self.window = self;

    /**
     * Vendors
     * 
     */
    importScripts('/core/vendors/external/JavaScript-MD5/v2.10.0/js/md5.min.js');
    // importScripts('/core/vendors/external/jquery/v3.3.1/jquery-3.3.1.min.js');
    // importScripts('/core/vendors/external/jquery-xpath/v0.3.1/jquery.xpath.js');
    importScripts('/core/vendors/external/moment/v2.10.6/moment.js');
    importScripts('/core/vendors/external/extend/v0.0.0/extend.js');
    importScripts('/core/vendors/internal/DependencyLoader.js');

    /**
     * Scripts
     * 
     */
    importScripts('/core/js/accessors/Base.js');
    importScripts('/core/js/accessors/Copy.js');
    importScripts('/core/js/accessors/Episode.js');
    importScripts('/core/js/accessors/Fact.js');
    importScripts('/core/js/accessors/Podcast.js');
    importScripts('/core/js/accessors/Setting.js');
    importScripts('/core/js/collections/Base.js');
    importScripts('/core/js/collections/Copy.js');
    importScripts('/core/js/collections/Episodes.js');
    importScripts('/core/js/collections/Facts.js');
    importScripts('/core/js/collections/Podcasts.js');
    importScripts('/core/js/collections/Settings.js');
    importScripts('/core/js/helpers/Base.js');
    importScripts('/core/js/models/Base.js');
    importScripts('/core/js/models/Copy.js');
    importScripts('/core/js/models/Episode.js');
    importScripts('/core/js/models/Fact.js');
    importScripts('/core/js/models/Podcast.js');
    importScripts('/core/js/models/Setting.js');
    importScripts('/core/js/utils/ArrayUtils.js');
    importScripts('/core/js/utils/CacheUtils.js');
    importScripts('/core/js/utils/CopyUtils.js');
    importScripts('/core/js/utils/DataUtils.js');
    importScripts('/core/js/utils/DTUtils.js');
    importScripts('/core/js/utils/ImageUtils.js');
    importScripts('/core/js/utils/LogUtils.js');
    importScripts('/core/js/utils/NotificationUtils.js');
    importScripts('/core/js/utils/NumberUtils.js');
    importScripts('/core/js/utils/RequestUtils.js');
    importScripts('/core/js/utils/SettingsUtils.js');
    importScripts('/core/js/utils/StringUtils.js');
    importScripts('/core/js/pages/PandaPodcastsBackground.js');

    // /**
    //  * onInstalled setup
    //  * 
    //  * Due to apparent issues with setting up onInstalled calls asynchronously,
    //  * these need to be here.
    //  * 
    //  * @note    The frame context type was added to ensure the context menu
    //  *          option showed up within a PDF. See here:
    //  *          - https://416.io/ss/f/zw2xs0
    //  */
    // chrome.runtime.onInstalled.addListener(function() {
    //     chrome.contextMenus.removeAll().then(function() {
    //         chrome.contextMenus.create({
    //             id: 'scuba-contextMenu',
    //             title: 'Scuba',
    //             contexts: ['page', 'image', 'frame', 'selection', 'link'],
    //             // contexts: ['page', 'image', 'selection', 'link'],
    //         });
    //     });
    //     self.ContentScriptsLoader.insert().then(function() {
    //         console.log('Extension code available in all tabs');
    //     });
    // });

    // /**
    //  * Load
    //  * 
    //  */
    // self.scuba.DependencyLoader.load(function(attempts) {
    //     self.scuba.state = new self.scuba.ServiceWorkerState();
    //     self.scuba.state.setup().then(function() {
    //         console.log('serviceWorker.js is ready');
    //     });
    // });
})();

