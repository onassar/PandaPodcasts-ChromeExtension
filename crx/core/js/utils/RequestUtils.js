
/**
 * RequestUtils
 * 
 * @abstract
 */
window.RequestUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'RequestUtils')
     */
    var __string = 'RequestUtils';

    /**
     * Methods
     * 
     */

    /**
     * __url
     * 
     * @access  private
     * @param   String url
     * @param   String callbackName
     * @return  Promise
     */
    var __url = function(url, callbackName) {
        return fetch(url).then(function(response) {
            return response[callbackName]();
        }).then(function(body) {
            var response = {
                body: body,
                url: url
            };
            return response;
        }).catch(function(err) {
            LogUtils.log(err);
            return err;
        });
    };

    /**
     * __urls
     * 
     * @access  private
     * @param   Array urls
     * @param   Boolean sequential
     * @param   Function stepFunction
     * @param   String callbackName
     * @return  Promise
     */
    var __urls = function(urls, sequential, stepFunction, callbackName) {
        return new Promise(async function(resolve, reject) {
            var index,
                url,
                promise,
                promises = [];
            for (index in urls) {
                url = urls[index];
                if (sequential === true) {
                    promise = await RequestUtils.url[callbackName](url);
                    stepFunction.apply(stepFunction, [url]);
                } else {
                    promise = RequestUtils.url[callbackName](url);
                }
                promises.push(promise);
            }
            Promise.all(promises).then(function(responses) {
                resolve(responses);
            }).catch(function(err) {
                LogUtils.log(err);
                reject(err);
            });
        });
    };

    // Public
    return {

        /**
         * url
         * 
         * @access  public
         * @var     Object
         */
        url: {

            /**
             * json
             * 
             * @access  public
             * @param   String url
             * @return  Promise
             */
            json: function(url) {
                var promise = __url(url, 'json');
                return promise;
            },

            /**
             * text
             * 
             * @access  public
             * @param   String url
             * @return  Promise
             */
            text: function(url) {
                var promise = __url(url, 'text');
                return promise;
            }
        },

        /**
         * urls
         * 
         * @access  public
         * @var     Object
         */
        urls: {

            /**
             * json
             * 
             * @access  public
             * @param   Array urls
             * @param   undefined|Boolean sequential (default: false)
             * @param   undefined|Function stepFunction (default: function() {})
             * @return  Promise
             */
            json: function(urls, sequential, stepFunction) {
                sequential = DataUtils.getDefaultValue(sequential, false);
                stepFunction = DataUtils.getDefaultValue(stepFunction, function() {});
                var promise = __urls(urls, sequential, stepFunction, 'json');
                return promise;
            },

            /**
             * text
             * 
             * @access  public
             * @param   Array urls
             * @param   undefined|Boolean sequential (default: false)
             * @param   undefined|Function stepFunction (default: function() {})
             * @return  Promise
             */
            text: function(urls, sequential, stepFunction) {
                sequential = DataUtils.getDefaultValue(sequential, false);
                stepFunction = DataUtils.getDefaultValue(stepFunction, function() {});
                var promise = __urls(urls, sequential, stepFunction, 'text');
                return promise;
            }
        }
    };
})();
