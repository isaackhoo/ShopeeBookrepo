const styles = require('./src/Styles/index.json');
const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            ...styles
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        }
    ]
}