module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target : 'http://localhost:3000/'
            },
            '/login': {
                target : 'http://localhost:3000/'
            },
            '/logout': {
                target : 'http://localhost:3000/'
            }
        },
        hot: true,
        host: '0.0.0.0'
    }
  }