const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const vendorFiles = ["react", "react-dom", "redux", "react-apollo", "moment"];

const clientConfig = args => {
  const extractPcssAdmin = new ExtractTextPlugin("[name].min.css");
  if (typeof args === "undefined") {
    args = { theme: "" };
  }
  const config = merge(baseConfig(args, "admin"), {
    target: "web",
    output: {
      path: path.join(__dirname, "../"),
      filename: "[name]-bundle.min.js",
    },
    plugins: [extractPcssAdmin],
    module: {
      rules: [
        {
          test: /\.(css|pcss)$/,
          use: extractPcssAdmin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: { importLoaders: 1, minimize: true },
              },
              "postcss-loader",
            ],
          }),
          include: [
            path.resolve(__dirname, "../src/admin"),
            path.resolve(__dirname, "../node_modules"),
            path.resolve(__dirname, "../src/public"),
          ],
        },
      ],
    },
  });
  config.entry = {
    "dist/admin/public/dist/admin": [path.join(__dirname, "../src/admin/app")],
    ["public/js/vendor"]: vendorFiles,
  };
  return config;
};

module.exports = args => [clientConfig(args)];
