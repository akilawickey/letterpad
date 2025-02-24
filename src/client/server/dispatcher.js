const fs = require("fs");
const path = require("path");
const config = require("../../config");
const { getHtml } = require("./html");

const dispatcher = (url, client, options, isStatic) => {
  const settings = {};
  options.data.settings.forEach(item => {
    settings[item.option] = item.value;
  });
  let theme = settings.theme;
  // In dev mode if a theme is explicitly called, then use that
  if (process.env.theme && process.env.theme !== "") {
    theme = process.env.theme;
  }
  // Get the server file based on the appropriate theme
  let serverFile = "../themes/" + theme + "/public/dist/server.node.js";

  if (!fs.existsSync(path.join(__dirname, serverFile))) {
    return Promise.reject(
      "Server file does not exist. Wait for the build to finish and try again after some time.",
    );
  }
  // this is the bundle file from server.js which returns a promise
  const server = require(serverFile).default;

  return server(url, client, config, isStatic)
    .then(({ html, apolloState, head, sheet }) => {
      let styles = "";
      if (sheet) styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet

      const content = getHtml(
        theme,
        html,
        apolloState,
        head,
        settings,
        styles,
        isStatic,
      );
      return Promise.resolve(content);
    })
    .catch(e => {
      console.log("e :", e);
      return Promise.reject("Error while rendering", e);
    });
};

module.exports.dispatcher = dispatcher;
