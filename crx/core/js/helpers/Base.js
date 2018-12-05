window.DependencyLoader.push(['Class'], function() {

    /**
     * Base
     * 
     * @extends Class
     */
    window.Base = Class.extend({

        /**
         * _data
         * 
         * @access  protected
         * @var     Object (default: {})
         */
        _data: {},

        /**
         * _proxies
         * 
         * @access  protected
         * @var     Object (default: {})
         */
        _proxies: {},

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'Base')
         */
        _string: 'Base',

        /**
         * init
         * 
         * @access  public
         * @param   Object data
         * @return  void
         */
        init: function(data) {
            this._data = data;
        },

        /**
         * _proxy
         * 
         * This beautifully complicated method takes care of proxying sub-objects of
         * a class. It does this by storing the string version of a properties
         * methods, and then when it's called, iterating over them and creating new
         * methods, with the proper scope.
         * 
         * @access  protected
         * @param   String key
         * @return  void
         */
        _proxy: function(key) {
            if (this._proxies[key] === undefined) {
                this._proxies[key] = {};
            }
            var index,
                fn;
            for (index in this[key]) {
                if (this._proxies[key][index] === undefined) {
                    fn = this[key][index].toString();
                    fn = 'var fn = ' + (fn) + ';';
                    this._proxies[key][index] = fn;
                }
            }
            for (index in this[key]) {
                eval(this._proxies[key][index]);
                this[key][index] = jQuery.proxy(fn, this);
            }
        },

        /**
         * get
         * 
         * @access  public
         * @param   String key
         * @return  mixed
         */
        get: function(key) {
            return this._data[key];
        },

        /**
         * off
         * 
         * @access  public
         * @return  void
         */
        off: function() {
            $(this).off.apply($(this), $(arguments).toArray());
        },

        /**
         * on
         * 
         * @access  public
         * @return  void
         */
        on: function() {
            $(this).on.apply($(this), $(arguments).toArray());
        },

        /**
         * once
         * 
         * @access  public
         * @return  void
         */
        once: function() {
            $(this).one.apply($(this), $(arguments).toArray());
        },

        /**
         * triggerHandler
         * 
         * @access  public
         * @return  void
         */
        triggerHandler: function() {
            $(this).triggerHandler.apply($(this), $(arguments).toArray());
        },

        /**
         * unbind
         * 
         * @access  public
         * @return  void
         */
        unbind: function() {
            $(this).unbind.apply($(this), $(arguments).toArray());
        }
    });
});
