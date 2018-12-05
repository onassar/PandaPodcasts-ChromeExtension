
/**
 * DataUtils
 * 
 * @abstract
 */
window.DataUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __accessors
     * 
     * @access  private
     * @var     Object (default: {})
     */
    var __accessors = {};

    /**
     * __models
     * 
     * @access  private
     * @var     Object (default: {})
     */
    var __models = {};

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'DataUtils')
     */
    var __string = 'DataUtils';

    // Public
    return {

        /**
         * copyToClipboard
         * 
         * @access  public
         * @param   String content
         * @return  void
         */
        copyToClipboard: function(content) {
            var $element = jQuery('<input type="text" />'),
                element = $element[0];
            $(document.body).append($element);
            $element.val(content);
            element.select();
            document.execCommand('copy');
            element.blur();
            $element.remove();
        },

        /**
         * dataURLToBlob
         * 
         * @see     http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
         * @access  public
         * @param   String dataURL
         * @return  Blob
         */
        dataURLToBlob: function(dataURL) {
            var byteString;
            if (dataURL.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(dataURL.split(',')[1]);
            } else {
                byteString = unescape(dataURL.split(',')[1]);
            }
            var mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0],
                ab = new ArrayBuffer(byteString.length),
                ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            try {
                return new Blob([ab], {type: mimeString});
            } catch (e) {
                var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder,
                    bb = new BlobBuilder();
                bb.append(ab);
                return bb.getBlob(mimeString);
            }
        },

        /**
         * getAccessor
         * 
         * @access  public
         * @param   String key
         * @return  null|Accessor
         */
        getAccessor: function(key) {
            if (__accessors[key] === undefined) {
                return null;
            }
            return __accessors[key];
        },

        /**
         * getDefaultValue
         * 
         * @access  public
         * @param   undefined|mixed value
         * @param   mixed defaultValue
         * @return  mixed
         */
        getDefaultValue: function(value, defaultValue) {
            if (value === undefined) {
                return defaultValue;
            }
            return value;
        },

        /**
         * getRandomString
         * 
         * @see     http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
         * @access  public
         * @param   Number length (default: 10)
         * @return  String
         */
        getRandomString: function(length) {
            var str = '',
                range = 'abcdefghijklmnopqrstuvwxyz0123456789',
                i = 0,
                l = length || 10;
            for (i; i < l; i++) {
                str += range.charAt(Math.floor(Math.random() * range.length));
            }
            return str;
        },

        /**
         * merge
         * 
         * @access  public
         * @return  Object
         */
        merge: function() {
            var objs = arguments,
                args = [true, {}];
            args = ArrayUtils.merge(args, objs);
            return jQuery.extend.apply(jQuery, args);
        },

        /**
         * render
         * 
         * @see     https://stackoverflow.com/questions/5653207/remove-html-comments-with-regex-in-javascript
         * @see     https://stackoverflow.com/questions/48047150/refused-to-evaluate-a-string-as-javascript-because-unsafe-eval-is-not-an-allow
         * @access  public
         * @param   String viewName
         * @param   undefined|Object data (default: {})
         * @return  jQuery
         */
        render: function(viewName, data) {
            data = DataUtils.getDefaultValue(data, {});
            var $script = $('script[name="' + (viewName) + '"]'),
                markup = $script.html(),
                compiler = _.template(markup),
                rendered = compiler(data).trim(),
                parsed = jQuery.parseHTML(rendered),
                $element = $(parsed);
            return $element;
        },

        /**
         * serialize
         * 
         * @see     http://api.jquery.com/jquery.param/
         * @access  public
         * @param   Object obj
         * @return  String
         */
        serialize: function(obj) {
            return jQuery.param(obj);
        },

        /**
         * get
         * 
         * @access  public
         * @var     Object
         */
        get: {

            /**
             * model
             * 
             * @access  public
             * @param   String name
             * @return  Model
             */
            model: function(name) {
                if (__models[name] !== undefined) {
                    return __models[name];
                }
                var reference = (name) + 'Model',
                    model = new window[reference]();
                __models[name] = model;
                return model;
            }
        },

        /**
         * setAccessor
         * 
         * @access  public
         * @param   String key
         * @param   String name
         * @param   Object data
         * @return  Accessor
         */
        setAccessor: function(key, name, data) {
            var accessor = DataUtils.getAccessor(key);
            if (accessor === null) {
                var reference = (name) + 'Accessor',
                    accessor = new window[reference](data);
                __accessors[key] = accessor;
                return accessor;
            }
            accessor.merge(data);
            return accessor;
        },

        /**
         * valid
         * 
         * @access  public
         * @param   mixed value
         * @return  Boolean
         */
        valid: function(value) {
            if (value === undefined) {
                return false;
            }
            if (value === null) {
                return false;
            }
            return true;
        },

        /**
         * xpath
         * 
         * @access  public
         * @param   jQuery $element
         * @param   String path
         * @return  void
         */
        xpath: function($element, path) {
            var results = [],
                parent = $element[0],
                query = document.evaluate(
                    path,
                    parent,
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null
                );
            for (var i=0, length=query.snapshotLength; i<length; ++i) {
                results.push(query.snapshotItem(i));
            }
            return results;
        }
    };
})();
