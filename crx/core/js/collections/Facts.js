window.DependencyLoader.push(['BaseCollection', 'FactModel'], function() {

    /**
     * FactsCollection
     * 
     * @extends BaseCollection
     */
    window.FactsCollection = BaseCollection.extend({

        /**
         * _model
         * 
         * @access  protected
         * @var     Model
         */
        _model: DataUtils.get.model('Fact'),

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'FactsCollection')
         */
        _string: 'FactsCollection',

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
