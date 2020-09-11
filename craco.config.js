const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    // for *.less
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          // modifyVars: { '@primary-color': '#1DA57A' },
          // javascriptEnabled: true,
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
    // for *.module.less
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule(lessRule) {
          return {
            test: /\.module\.less$/,
            use: lessRule.use,
          };
        },
        cssLoaderOptions: {
          modules: true,
        },
      },
    },
  ],
};
