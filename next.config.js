const path = require("path");
const webpack = require("webpack");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");

module.exports = withPlugins(
  [
    [
      withImages,
      {
        webpack(config, options) {
          return config;
        },
      },
    ],
    [
      [
        withSass,
        {
          cssModules: true,
          webpack: function (config) {
            config.module.rules.push({
              test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
              use: {
                loader: "url-loader",
                options: {
                  limit: 100000,
                  name: "[name].[ext]",
                },
              },
            });
            return config;
          },
        },
      ],
    ],
  ]
  // {
  //   webpack: (config, {dev}) => {
  //     config.resolve.modules.push(path.resolve('./'));
  //     config.plugins.push(
  //       new webpack.ProvidePlugin({
  //         $: 'jquery',
  //         jQuery: 'jquery',
  //       }),
  //     );
  //     return config;
  //   },
  // },
);
