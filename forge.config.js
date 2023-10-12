module.exports = {
  packagerConfig: {
    appVersion: "1.0.0",
    platform: "win32",
    name: "BaseElectronEnv",
    icon: "./resources/icon/acfun",
    asar: false,
    ignore:[
        "src",
        ".idea",
        "resources",
        ".gitignore",
        "node_modules",
        "forge.config.js",
        "tsconfig.json",
        "README.md",
        "webpack.base.config.js",
        "webpack.main.config.js",
        "webpack.render.config.js",
    ],
    win32metadata :{
      ProductName: "BaseElectronEnv",
      CompanyName: "EpiGrf",
      FileDescription: "Base Electron Env"
    }
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      config: {},
    }
  ],
};
