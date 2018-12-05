
/**
 * ArrayUtils
 * 
 * @abstract
 */
window.ArrayUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'ArrayUtils')
     */
    var __string = 'ArrayUtils';

    // Public
    return {

        /**
         * clean
         * 
         * @access  public
         * @param   Array arr
         * @return  Array
         */
        clean: function(arr) {
            return arr.filter(function(index, value) {
                return value !== undefined;
            });
        },

        /**
         * clone
         * 
         * @see     https://www.hacksparrow.com/javascript-convert-arguments-to-array.html
         * @see     http://stackoverflow.com/questions/3775480/is-there-a-method-to-clone-an-array-in-jquery
         * @access  public
         * @param   Array arr
         * @return  Array
         */
        clone: function(arr) {
            if (DataUtils.valid(arr.slice) === false) {
                var clone = Array.prototype.slice.call(arr);
                return clone;
            }
            var clone = arr.slice(0);
            return clone;
        },

        /**
         * contains
         * 
         * @access  public
         * @param   Array arr
         * @param   mixed value
         * @return  Boolean
         */
        contains: function(arr, value) {
            return arr.indexOf(value) !== -1;
        },

        /**
         * count
         * 
         * @access  public
         * @param   Array arr
         * @param   mixed value
         * @return  Boolean
         */
        count: function(arr, value) {
            var count = 0,
                index;
            for (index in arr) {
                if (arr[index] === value) {
                    count++;
                }
            }
            return count;
        },

        /**
         * filterByUniquePropertyValue
         * 
         * @access  public
         * @param   Array arr
         * @param   String propertyName
         * @return  Array
         */
        filterByUniquePropertyValue: function(arr, propertyName) {
            arr = arr.filter(
                function(value, index, arr) {
                    return arr.map(
                        function(obj) {
                            return obj[propertyName];
                        }
                    ).indexOf(value[propertyName]) === index;
                }
            );
            return arr;
        },

        /**
         * merge
         * 
         * @access  public
         * @return  Array
         */
        merge: function() {
            var arrs = [],
                args = arguments,
                index;
            for (index in args) {
                arrs.push(
                    ArrayUtils.clone(args[index])
                );
            }
            return [].concat.apply([], arrs);
        },

        /**
         * random
         * 
         * @access  public
         * @param   Array arr
         * @return  mixed
         */
        random: function(arr) {
            var index = Math.floor(Math.random() * arr.length),
                value = arr[index];
            return value;
        },

        /**
         * remove
         * 
         * @access  public
         * @param   Array arr
         * @param   mixed value
         * @return  Boolean
         */
        remove: function(arr, value) {
            var index = arr.indexOf(value);
            if (index === -1) {
                return false;
            }
            arr.splice(index, 1);
            return true;
        },

        /**
         * unique
         * 
         * @access  public
         * @param   Array arr
         * @return  Array
         */
        unique: function(arr) {
            return arr.filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });
        }
    };
})();
