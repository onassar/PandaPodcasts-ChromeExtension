window.DependencyLoader.push(['BaseCollection', 'CopyModel'], function() {

    /**
     * CopyCollection
     * 
     * @extends BaseCollection
     */
    window.CopyCollection = BaseCollection.extend({

        /**
         * _model
         * 
         * @access  protected
         * @var     Model
         */
        _model: DataUtils.get.model('Copy'),

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'CopyCollection')
         */
        _string: 'CopyCollection',

        /**
         * init
         * 
         * @access  public
         * @param   Object data
         * @return  void
         */
        init: function(data) {
            this._super(data);
        }
    });
});
