window.DependencyLoader.push(['BaseCollection', 'SettingModel'], function() {

    /**
     * SettingsCollection
     * 
     * @extends BaseCollection
     */
    window.SettingsCollection = BaseCollection.extend({

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
         * @var     String (default: 'SettingsCollection')
         */
        _string: 'SettingsCollection',

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
         * copy
         * 
         * @access  public
         * @return  String
         */
        copy: function() {
            var copy = this.remote('copy');
            return copy;
        },

        /**
         * facts
         * 
         * @access  public
         * @return  String
         */
        facts: function() {
            var facts = this.remote('facts');
            return facts;
        },

        /**
         * installed
         * 
         * @access  public
         * @return  String
         */
        installed: function() {
            var installed = this.remote('installed');
            return installed;
        },

        /**
         * podcasts
         * 
         * @access  public
         * @return  String
         */
        podcasts: function() {
            var podcasts = this.remote('podcasts');
            return podcasts;
        },

        /**
         * proxy
         * 
         * @access  public
         * @return  String
         */
        proxy: function() {
            var proxy = this.remote('proxy');
            return proxy;
        },

        /**
         * remote
         * 
         * @access  public
         * @param   String key
         * @return  String
         */
        remote: function(key) {
            var setting = DataUtils.getAccessor('remotes'),
                remotes = setting.get('value'),
                remote = remotes[key];
            return remote;
        }
    });
});
