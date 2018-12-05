
/**
 * NumberUtils
 * 
 * @abstract
 */
window.NumberUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     Number (default: 'NumberUtils')
     */
    var __string = 'NumberUtils';

    // Public
    return {

        /**
         * round
         * 
         * @access  public
         * @param   Number value
         * @param   Number precision (default: 0)
         * @return  Number
         */
        round: function(value, precision) {
            precision = DataUtils.getDefaultValue(precision, 0);
            var multiplier = Math.pow(10, precision),
                rounded = Math.round(value * multiplier) / multiplier;
            return rounded;
        }
    };
})();
