
/**
 * StringUtils
 * 
 * @see     https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
 * @see     https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
 * @see     https://stackoverflow.com/questions/4344819/javascript-regexp-match-anything-but-newlines-r-n
 * @abstract
 */
window.StringUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'StringUtils')
     */
    var __string = 'StringUtils';

    // Public
    return {

        /**
         * code
         * 
         * @access  public
         * @param   String str
         * @return  String
         */
        code: function(str) {
            var converted = str.replace(/`([^`]+)`/g, '<code>$1</code>');
            return converted;
        },

        /**
         * decode
         * 
         * @see     https://stackoverflow.com/a/30106551/115025
         * @access  public
         * @param   String str
         * @return  String
         */
        decode: function(str) {
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        },

        /**
         * emojis
         * 
         * @access  public
         * @param   String str
         * @return  String
         */
        emojis: function(str) {
            var emoji = new EmojiConvertor(),
                replaced = emoji.replace_colons(str);
            return replaced;
        },

        /**
         * entities
         * 
         * @see     https://ourcodeworld.com/articles/read/188/encode-and-decode-html-entities-using-pure-javascript
         * @see     https://github.com/mathiasbynens/he
         * @access  public
         * @var     Object
         */
        entities: {

            /**
             * decode
             * 
             * @access  public
             * @param   String str
             * @return  String
             */
            decode: function(str) {
                return str.replace(/&#(\d+);/g, function(match, dec) {
                    return String.fromCharCode(dec);
                });
            },

            /**
             * encode
             * 
             * @access  public
             * @param   String str
             * @return  String
             */
            encode: function(str) {
                var buf = [];
                for (var i=str.length-1;i>=0;i--) {
                    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
                }
                return buf.join('');
            }
        },

        /**
         * links
         * 
         * @see     https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
         * @see     https://github.com/SoapBox/linkifyjs
         * @see     https://soapbox.github.io/linkifyjs/docs/options.html#attributes
         * @access  public
         * @param   String str
         * @return  String
         */
        links: function(str) {
            var converted = linkifyHtml(str, {
                format: function(value, type) {
                    var formatted = value.replace(/^http[s]?\:\/\//, '');
                    formatted = formatted.replace(/\/$/, '');
                    if (formatted.length > 30) {
                        formatted = formatted.slice(0, 30) + '...';
                    }
                    return formatted;
                }
            });
            return converted;
        },

        /**
         * numberWithCommas
         * 
         * @see     https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
         * @access  public
         * @param   Number number
         * @return  String
         */
        numberWithCommas: function(number) {
            var formatted = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return formatted;
        },

        /**
         * shortenNumber
         * 
         * @see     https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
         * @access  public
         * @param   Number number
         * @return  String
         */
        shortenNumber: function(number) {
            if (number >= 10000) {
                number = number / 1000;
                var shortened = NumberUtils.round(number, 0) + 'k';
                return shortened;
            }
            if (number >= 1000) {
                number = number / 1000;
                var shortened = NumberUtils.round(number, 1) + 'k';
                return shortened;
            }
            return number;
        }
    };
})();
