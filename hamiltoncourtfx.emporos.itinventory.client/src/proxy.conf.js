const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "https://localhost:7295",
    secure: false,
    "pathRewrite": { "^/api": "" }
  }
]

module.exports = PROXY_CONFIG;
