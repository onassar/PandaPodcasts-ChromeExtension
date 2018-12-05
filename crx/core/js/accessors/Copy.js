window.DependencyLoader.push(['BaseAccessor', 'CopyModel'], function() {

    /**
     * CopyAccessor
     * 
     * @extends BaseAccessor
     */
    window.CopyAccessor = BaseAccessor.extend({

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
         * @var     String (default: 'CopyAccessor')
         */
        _string: 'CopyAccessor',

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
