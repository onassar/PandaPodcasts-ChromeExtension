
// 
window.PandaPodcastsPopup = (function() {

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
     * __addLoadListener
     * 
     * @access  private
     * @return  void
     */
    var __addLoadListener = function() {
        window.onload = async function() {
            var promises = [
                await LogUtils.log('Popup: Start'),
                await __loadSettings(),
                await __loadCopy(),
                await __loadFacts(),
                await __showRandomFact(),
                await __loadPodcasts(),
                await __insertTemplates(),
                await __setupPageView(),
                await LogUtils.log('Popup: Complete'),
                await __sleep(),
                await __showPageView()
            ];
            Promise.all(promises);
        };
    };

    /**
     * __insertTemplate
     * 
     * @access  private
     * @param   String url
     * @return  Promise
     */
    var __insertTemplate = function(url) {
        var $body = $('body');
        return RequestUtils.url.text(url).then(function(response) {
            $body.append(response.body);
            return true;
        }).catch(function(err) {
            LogUtils.log(err);
            return false;
        });
    };

    /**
     * __insertTemplates
     * 
     * @access  private
     * @return  Promise
     */
    var __insertTemplates = function() {
        return new Promise(function(resolve, reject) {
            var paths = SettingsUtils.templates(),
                promise,
                promises = [];
            paths.forEach(function(path, index) {
                promise = __insertTemplate(path);
                promises.push(promise);
            });
            Promise.all(promises).then(function(successes) {
                resolve(successes);
            }).catch(function(errors) {
                reject(errors);
            })
        });
    };

    /**
     * __loadCopy
     * 
     * @access  private
     * @return  Promise
     */
    var __loadCopy = function() {
        var model = DataUtils.get.model('Copy'),
            promise = model.list().then(function(copy) {
                __collections.copy = copy;
                return copy;
            }).catch(function(err) {
                LogUtils.log(err)
            });
        return promise;
    };

    /**
     * __loadFacts
     * 
     * @access  private
     * @return  Promise
     */
    var __loadFacts = function() {
        var model = DataUtils.get.model('Fact'),
            promise = model.list().then(function(facts) {
                __collections.facts = facts;
                return facts;
            }).catch(function(err) {
                LogUtils.log(err)
            });
        return promise;
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
     * __setupPageView
     * 
     * @access  private
     * @return  Promise
     */
    var __setupPageView = function() {
        var $element = $('body'),
            view = new PopupPageView($element);
        __view = view;
    };

    /**
     * __showPageView
     * 
     * @access  private
     * @return  void
     */
    var __showPageView = function() {
        var podcast = __collections.podcasts.first(),
            newest = __collections.podcasts.getNewest();
        if (newest.length > 0) {
            podcast = newest[0];
        }
        podcast.select(true);
        __view.show();
    };

    /**
     * __showRandomFact
     * 
     * @access  private
     * @return  void
     */
    var __showRandomFact = function() {
        var $body = $('body'),
            $graphic = $body.find('div.loader div.graphic'),
            $copy = $body.find('div.loader div.copy'),
            fact = PandaPodcastsPopup.get.facts().random(),
            loadingScreenImages = __collections.settings.find('key', 'loadingScreenImages').get('value'),
            loadingScreenImage = ArrayUtils.random(loadingScreenImages);
        fact = fact.get('fact');
        $graphic.find('.media').css({
            'background-image': 'url(\'' + (loadingScreenImage) + '\')'
        });
        $copy.text(fact);
        $graphic.removeClass('invisible');
        $copy.removeClass('invisible');
    };

    /**
     * __sleep
     * 
     * @access  private
     * @return  Promise
     */
    var __sleep = function() {
        var delay = SettingsUtils.getLoadingScreenMinDelay(),
            promise = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve();
                }, delay);
            });
        return promise;
    };

    // Public
    return {

        /**
         * get
         * 
         * @access  public
         * @var     Object
         */
        get: {

            /**
             * copy
             * 
             * @access  public
             * @return  CopyCollection
             */
            copy: function() {
                var collection = __collections.copy;
                return collection;
            },

            /**
             * facts
             * 
             * @access  public
             * @return  FactsCollection
             */
            facts: function() {
                var collection = __collections.facts;
                return collection;
            },

            /**
             * podcasts
             * 
             * @access  public
             * @return  PodcastsCollection
             */
            podcasts: function() {
                var collection = __collections.podcasts;
                return collection;
            },

            /**
             * settings
             * 
             * @access  public
             * @return  SettingsCollection
             */
            settings: function() {
                var collection = __collections.settings;
                return collection;
            },

            /**
             * view
             * 
             * @access  public
             * @return  PopupPageView
             */
            view: function() {
                var view = __view;
                return view;
            }
        },

        /**
         * init
         * 
         * @access  public
         * @return  void
         */
        init: function() {
            console.log('PandaPodcastsPopup');
            __addLoadListener();
        }
    };
})();

// Let's do this!
DependencyLoader.load();
PandaPodcastsPopup.init();
