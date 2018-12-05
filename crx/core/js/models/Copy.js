window.DependencyLoader.push(['BaseModel'], function() {

    /**
     * CopyModel
     * 
     * @extends BaseModel
     */
    window.CopyModel = BaseModel.extend({

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'CopyModel')
         */
        _string: 'CopyModel',

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
         * list
         * 
         * @access  public
         * @return  Promise
         */
        list: function() {
            var url = SettingsUtils.getRemoteCopyURL(),
                collection = new CopyCollection();
            return RequestUtils.url.json(url).then(function(response) {
                var facts = response.body;
                collection.map(facts);
                return collection;
            }).catch(function(err) {
                LogUtils.log(err);
                return collection;
            });
        }
    });
});
