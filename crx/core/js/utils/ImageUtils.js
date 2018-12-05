
/**
 * ImageUtils
 * 
 * @abstract
 */
window.ImageUtils = (function() {

    /**
     * Properties
     * 
     */

    /**
     * __string
     * 
     * @access  private
     * @var     String (default: 'ImageUtils')
     */
    var __string = 'ImageUtils';

    /**
     * Methods
     * 
     */

    /**
     * __getCloudinaryCloudName
     * 
     * @access  private
     * @return  String
     */
    var __getCloudinaryCloudName = function() {
        var cloudName = SettingsUtils.get('cloudinaryCloudName');
        return cloudName;
    };

    // Public
    return {

        /**
         * url
         * 
         * @access  public
         * @var     Object
         */
        url: {

            /**
             * fetch
             * 
             * @access  public
             * @param   String remoteURL
             * @return  String
             */
            fetch: function(remoteURL) {
                var imageResizingService = SettingsUtils.getImageResizingService();
                if (imageResizingService === 'none') {
                    return remoteURL;
                }
                var host = SettingsUtils.getHost('cloudFront'),
                    cloudName = __getCloudinaryCloudName(),
                    path = '/' + (cloudName) + '/image/fetch/c_scale,w_240/' + (remoteURL),
                    url = 'https://' + (host) + (path);
                return url;
            }
        }
    };
})();
