window.DependencyLoader.push(['Base'], function() {

    /**
     * BaseAccessor
     * 
     * @extends Base
     */
    window.BaseAccessor = Base.extend({

        /**
         * _model
         * 
         * Reference to the model responsible for CRUD operations on the
         * accessor.
         * 
         * @access  protected
         * @var     Model (default: null)
         */
        _model: null,

        /**
         * _references
         * 
         * @access  protected
         * @var     Object (default: {})
         */
        _references: {},

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'BaseAccessor')
         */
        _string: 'BaseAccessor',

        /**
         * _within
         * 
         * Array of collections that the Accessor is part of. For example, a
         * WatermarkUploadAccessor is part of the WatermarksCollection. This is
         * used in the deletion process of an accessor, to ensure it's properly
         * removed from associated collections.
         * 
         * @access  protected
         * @var     Array (default: [])
         */
        _within: [],

        /**
         * init
         * 
         * @access  public
         * @param   Object data
         * @return  void
         */
        init: function(data) {
            this._super(data);
            this._references = {};
        },

        /**
         * data
         * 
         * @access  public
         * @return  Object
         */
        data: function() {
            return this._data;
        },

        /**
         * getReference
         * 
         * @access  public
         * @param   String key
         * @return  mixed
         */
        getReference: function(key) {
            var reference = this._references[key];
            return reference;
        },

        /**
         * merge
         * 
         * Merges passed in data with the internal <_data> hash.
         * 
         * @access  public
         * @param   Object data
         * @return  void
         */
        merge: function(data) {
            this._data = DataUtils.merge(this._data, data);
        },

        /**
         * setReference
         * 
         * @access  public
         * @param   String key
         * @param   mixed reference
         * @return  void
         */
        setReference: function(key, reference) {
            this._references[key] = reference;
        },

        /**
         * within
         * 
         * Stores the collection in the <within> Array, so that we can keep
         * track of where the Accessor is being used.
         * 
         * @access  public
         * @param   Collection collection
         * @return  void
         */
        within: function(collection) {
            this._within.push(collection);
        }
    });
});
