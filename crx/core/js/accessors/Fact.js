window.DependencyLoader.push(['BaseAccessor', 'FactModel'], function() {

    /**
     * FactAccessor
     * 
     * @extends BaseAccessor
     */
    window.FactAccessor = BaseAccessor.extend({

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
         * @var     String (default: 'FactAccessor')
         */
        _string: 'FactAccessor',

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
