window.DependencyLoader.push('Base', function() {

    /**
     * BaseCollection
     * 
     * @extends Base
     */
    window.BaseCollection = Base.extend({

        /**
         * _accessors
         * 
         * @access  protected
         * @var     Array (default: [])
         */
        _accessors: [],

        /**
         * _model
         * 
         * @access  protected
         * @var     Model (default: null)
         */
        _model: null,

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'BaseCollection')
         */
        _string: 'BaseCollection',

        /**
         * init
         * 
         * @access  public
         * @return  void
         */
        init: function() {
            this._super();
            this._accessors = [];
        },

        /**
         * add
         * 
         * @access  public
         * @param   Array accessors
         * @return  void
         */
        add: function(accessors) {
            var index, accessor;
            for (index in accessors) {
                accessor = accessors[index];
                this._accessors.unshift(accessor);
                accessor.within(this);
            }
        },

        /**
         * all
         * 
         * @access  public
         * @return  Array
         */
        all: function() {
            var accessors = this._accessors;
            return accessors;
        },

        /**
         * each
         * 
         * @access  public
         * @param   Function iterator
         * @param   undefined|Array exceptions (default: [])
         * @return  void
         */
        each: function(iterator, exceptions) {
            exceptions = DataUtils.getDefaultValue(exceptions, []);
            jQuery.each(this._accessors, function(index, accessor) {
                if (ArrayUtils.contains(exceptions, accessor) === false) {
                    iterator(index, accessor);
                }
            });
        },

        /**
         * find
         * 
         * @access  public
         * @param   String key
         * @param   String value
         * @return  null|Accessor
         */
        find: function(key, value) {
            var index, accessor;
            for (index in this._accessors) {
                accessor = this._accessors[index];
                if (accessor.get(key) === value) {
                    return accessor;
                }
            }
            return null;
        },

        /**
         * first
         * 
         * @access  public
         * @return  Accessor
         */
        first: function() {
            var first = this.nth(0);
            return first;
        },

        /**
         * length
         * 
         * @access  public
         * @return  Number
         */
        length: function() {
            return this._accessors.length;
        },

        /**
         * map
         * 
         * @access  public
         * @param   Array objects
         * @return  Array
         */
        map: function(objects) {
            var index, obj, accessor, accessors = [], model = this._model;
            for (index in objects) {
                obj = objects[index];
                accessor = model.setAccessor(obj);
                accessors.unshift(accessor);
            }
            this.add(accessors);
            return accessors;
        },

        /**
         * merge
         * 
         * @access  public
         * @param   Collection collection
         * @return  void
         */
        merge: function(collection) {
            var objects = collection.objects();
            this.map(objects);
        },

        /**
         * nth
         * 
         * @access  public
         * @param   Number index
         * @return  Accessor
         */
        nth: function(index) {
            var nth = this._accessors[index];
            return nth;
        },

        /**
         * objects
         * 
         * @access  public
         * @return  Array
         */
        objects: function() {
            var objects = [],
                data;
            for (index in this._accessors) {
                data = this._accessors[index].data();
                objects.push(data);
            }
            return objects;
        },

        /**
         * random
         * 
         * @access  public
         * @return  Accessor
         */
        random: function() {
            var accessors = this._accessors,
                accessor = ArrayUtils.random(accessors);
            return accessor;
        },

        /**
         * reduce
         * 
         * @access  public
         * @param   Function iterator
         * @return  void
         */
        reduce: function(iterator) {
            var index, accessor;
            for (index in this._accessors) {
                accessor = this._accessors[index];
                if (iterator(accessor) === true) {
                    delete this._accessors[index];
                }
            }
            this._accessors = ArrayUtils.clean(this._accessors);
        },

        /**
         * remove
         * 
         * @access  public
         * @param   Array accessors
         * @return  void
         */
        remove: function(accessors) {
            return this.reduce(function(accessor) {
                return ArrayUtils.contains(accessors, accessor) === true;
            });
        },

        /**
         * reverse
         * 
         * @access  public
         * @return  void
         */
        reverse: function() {
            this._accessors = this._accessors.reverse();
        },

        /**
         * trim
         * 
         * @access  public
         * @param   Number max
         * @return  void
         */
        trim: function(max) {
            this._accessors.length = max;
        }
    });
});
