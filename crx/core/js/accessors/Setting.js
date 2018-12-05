window.DependencyLoader.push(['BaseAccessor', 'SettingModel'], function() {

    /**
     * SettingAccessor
     * 
     * @extends BaseAccessor
     */
    window.SettingAccessor = BaseAccessor.extend({

        /**
         * _model
         * 
         * @access  protected
         * @var     Model
         */
        _model: DataUtils.get.model('Setting'),

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'SettingAccessor')
         */
        _string: 'SettingAccessor',

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
