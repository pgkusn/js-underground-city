module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/webapi': {
                target: 'http://opendata.epa.gov.tw',
                changeOrigin: true
            }
        }
    }
};
