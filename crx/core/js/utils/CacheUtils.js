
/**
 * CacheUtils
 * 
 * @abstract
 */
window.CacheUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __cache
     * 
     * @access  private
     * @var     Object (default: {})
     */
    var __cache = {};

    /**
     * __defaultCacheDuration
     * 
     * @access  private
     * @var     Number (default: 10)
     */
    var __defaultCacheDuration = 10;

    /**
     * __enabled
     * 
     * @access  private
     * @var     Boolean (default: true)
     */
    var __enabled = true;

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'CacheUtils')
     */
    var __string = 'CacheUtils';

    /**
     * Methods
     * 
     */

    /**
     * __addMessageListeners
     * 
     * @access  private
     * @return  void
     */
    var __addMessageListeners = function() {
        __addStoreGetMessageListener();
        __addStoreSetMessageListener();
    };

    /**
     * __addStoreGetMessageListener
     * 
     * @access  private
     * @return  Boolean
     */
    var __addStoreGetMessageListener = function() {
        if (__backgroundRequest() === false) {
            return false;
        }
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request.action === 'cache.get') {
                    var key = request.key,
                        response = CacheUtils.get(key);
                    sendResponse(response);
                }
            }
        );
        return true;
    };

    /**
     * __addStoreSetMessageListener
     * 
     * @access  private
     * @return  Boolean
     */
    var __addStoreSetMessageListener = function() {
        if (__backgroundRequest() === false) {
            return false;
        }
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request.action === 'cache.set') {
                    var key = request.key,
                        value = request.value,
                        cacheDuration = request.cacheDuration,
                        response = CacheUtils.set(key, value, cacheDuration);
                    sendResponse(response);
                }
            }
        );
        return true;
    };

    /**
     * __backgroundRequest
     * 
     * @access  private
     * @return  Boolean
     */
    var __backgroundRequest = function() {
        try {
            chrome;
        }
        catch (err) {
            return false;
        }
        var href = location.href;
        if (href.match(/popup\.html$/) === null) {
            return true;
        }
        return false;
    };

    /**
     * __cleanup
     * 
     * @access  private
     * @return  Boolean
     */
    var __cleanup = function() {
        var object,
            index,
            now = __timestamp(),
            difference;
        for (index in __cache) {
            object = __cache[index];
            if (object.cacheDuration === 0) {
                continue;
            }
            difference = now - object.timestamp;
            if (difference >= object.cacheDuration) {
                delete __cache[index];
            }
        }
        return false;
    };

    /**
     * __timestamp
     * 
     * @access  private
     * @return  Number
     */
    var __timestamp = function() {
        var timestamp = Math.floor(new Date().getTime() / 1000);
        return timestamp;
    };

    /**
     * Methods
     * 
     */

    // Public
    return {

        /**
         * all
         * 
         * @access  public
         * @return  Array
         */
        all: function() {
            return __cache;
        },

        /**
         * backgroundRequest
         * 
         * @access  public
         * @return  Array
         */
        backgroundRequest: function() {
            return __backgroundRequest();
        },

        /**
         * cleanup
         * 
         * @access  public
         * @return  void
         */
        cleanup: function() {
            __cleanup();
        },

        /**
         * get
         * 
         * @access  public
         * @param   String key
         * @return  mixed|Promise
         */
        get: function(key) {
            if (__backgroundRequest() === true) {
                __cleanup();
                if (__cache[key] === undefined) {
                    return null;
                }
                if (__cache[key] === null) {
                    return null;
                }
                return __cache[key].value;
            }
            var promise = new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage({
                    action: 'cache.get',
                    key: key
                }, function(response) {
                    resolve(response);
                });
            });
            return promise;
        },

        /**
         * init
         * 
         * @access  public
         * @return  void
         */
        init: function() {
            __addMessageListeners();
        },

        /**
         * set
         * 
         * @access  public
         * @param   String key
         * @param   mixed value
         * @param   undefined|Number cacheDuration (default: __defaultCacheDuration)
         * @return  Boolean|Promise
         */
        set: function(key, value, cacheDuration) {
            if (cacheDuration === undefined) {
                cacheDuration = __defaultCacheDuration;
            }
            if (__backgroundRequest() === true) {
                __cleanup();
                if (__enabled === false) {
                    return false;
                }
                __cache[key] = {
                    cacheDuration: cacheDuration,
                    timestamp: __timestamp(),
                    value: value
                };
                return true;
            }
            var promise = new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage({
                    action: 'cache.set',
                    key: key,
                    value: value,
                    cacheDuration: cacheDuration
                }, function(response) {
                    resolve(response);
                });
            });
            return promise;
        },
    };
})();

// Let's do this!
CacheUtils.init();
