
/**
 * LogUtils
 * 
 * @abstract
 */
window.LogUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'LogUtils')
     */
    var __string = 'LogUtils';

    /**
     * Method
     * 
     */

    /**
     * __getTimestamp
     * 
     * Returns a string which represents the timestamp, up to the microsecond.
     * 
     * @access  private
     * @return  String
     */
    var __getTimestamp = function() {
        var timestamp = moment().format('HH:mm:ss (0.SSSS)');
        return timestamp;
    };

    // Public
    return {

        /**
         * log
         * 
         * @access  public
         * @param   String msg
         * @return  void
         */
        log: function(msg) {
            var timestamp = __getTimestamp(),
                color = 'color:red;';
            msg = '%c' + (timestamp) + ' ' + (msg);
            console.log(msg, color);
        }
    };
})();
