/* eslint-disable */
const withCss = require("@zeit/next-css");
const path = require("path");

module.exports = withCss({
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader"
      });
    }

    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["modules"] = path.join(__dirname, "modules");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");

    return config;
  }
});
