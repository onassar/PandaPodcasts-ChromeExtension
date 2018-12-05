window.DependencyLoader.push(['BaseModel'], function() {

    /**
     * SettingModel
     * 
     * @extends BaseModel
     */
    window.SettingModel = BaseModel.extend({

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'SettingModel')
         */
        _string: 'SettingModel',

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
         * _getApp
         * 
         * @throws  Error
         * @access  protected
         * @return  Object
         */
        _getApp: function() {
            var setting = DataUtils.getAccessor('apps'),
                apps = setting.get('value'),
                manifest = SettingsUtils.getManifest(),
                index,
                app;
            for (index in apps) {
                app = apps[index];
                if (manifest[app.key] === app.value) {
                    return app;
                }
            }
            var msg = 'Error retrieving app';
            throw new Error(msg);
        },

        /**
         * _getSettingsURL
         * 
         * @access  protected
         * @param   Boolean core
         * @return  String
         */
        _getSettingsURL: function(core) {
            if (core === true) {
                var url = chrome.runtime.getURL('/core/files/settings.json');
                return url;
            }
            var app = this._getApp(),
                role = SettingsUtils.role(),
                url = app.properties.resources.settings[role];
            return url;
        },

        /**
         * _removeSettingsByRole
         * 
         * @access  protected
         * @param   Array settings
         * @return  Array
         */
        _removeSettingsByRole: function(settings) {
            var role = 'production';
            if (SettingsUtils.development() === true) {
                role = 'development';
            }
            var index, setting;
            for (index in settings) {
                setting = settings[index];
                if (ArrayUtils.contains(setting.roles, role) === false) {
                    delete settings[index];
                }
            }
            settings = ArrayUtils.clean(settings);
            return settings;
        },

        /**
         * list
         * 
         * @access  public
         * @param   Boolean core
         * @return  Promise
         */
        list: function(core) {
            var _this = this,
                url = this._getSettingsURL(core),
                collection = new SettingsCollection();
            return RequestUtils.url.json(url).then(function(response) {
                var settings = response.body;
                settings = _this._removeSettingsByRole(settings);
                collection.map(settings);
                return collection;
            }).catch(function(err) {
                LogUtils.log(err);
                return collection;
            });
        }
    });
});
