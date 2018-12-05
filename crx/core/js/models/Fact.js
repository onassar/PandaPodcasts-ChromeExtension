window.DependencyLoader.push(['BaseModel'], function() {

    /**
     * FactModel
     * 
     * @extends BaseModel
     */
    window.FactModel = BaseModel.extend({

        /**
         * _string
         * 
         * @access  protected
         * @var     String (default: 'FactModel')
         */
        _string: 'FactModel',

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
            var url = SettingsUtils.getRemoteFactsURL(),
                collection = new FactsCollection();
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
