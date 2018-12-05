window.DependencyLoader.push(['Base'], function() {

    /**
     * BaseModel
     * 
     * @extends Base
     */
    window.BaseModel = Base.extend({

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'BaseModel')
         */
        _string: 'BaseModel',

        /**
         * init
         * 
         * @access  public
         * @param   Object data
         * @return  void
         */
        init: function(data) {
            this._super(data);
        },

        /**
         * setAccessor
         * 
         * @access  public
         * @param   Object data
         * @return  Accessor
         */
        setAccessor: function(data) {
            var key = data.key,
                name = this._string.split('Model').shift(),
                accessor = DataUtils.setAccessor(key, name, data);
            return accessor;
        }
    });
});
