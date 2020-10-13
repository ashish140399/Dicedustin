const GitRevisionPlugin = require("git-revision-webpack-plugin");

const domain = "dicether.com";

module.exports = {
    domain: domain,
    contractAddress: "0xc9A2F098A54f152B369a592D091f20F3Bd2cC29D",
    serverAddress: "0x8beA174F641D239D7f02b9E2d92B8Fd1Cdd75773", // Change 0x50a
    apiUrl: `API_URL=https://backdice.herokuapp.com`, // Change https://api.${domain}/api
    websocketUrl: `https://websocket.${domain}`,
    chainId: 1, // Change 42
    version: new GitRevisionPlugin().commithash(),
};
