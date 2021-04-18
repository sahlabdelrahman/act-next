const path = require("path");
const webpack = require("webpack");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
// const withPWA = require("next-pwa");

// module.exports = withPlugins([
//   [
//     withPWA,
//     {
//       pwa: {
//         dest: "public",
//         register: true,
//         swSrc: "service-worker.js",
//       },
//     },
//   ],
//   [
//     withImages,
//     {
//       webpack(config, options) {
//         return config;
//       },
//     },
//   ],
//   [
//     [
//       withSass,
//       {
//         cssModules: true,
//         webpack: function (config) {
//           config.module.rules.push({
//             test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
//             use: {
//               loader: "url-loader",
//               options: {
//                 limit: 100000,
//                 name: "[name].[ext]",
//               },
//             },
//           });
//           return config;
//         },
//       },
//     ],
//   ],
// ]);

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    swSrc: "service-worker.js",
  },
});
