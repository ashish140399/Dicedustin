const webpack = require("webpack");
const merge = require("webpack-merge");

const common = require("./common");

const contractAddress = "0xc9A2F098A54f152B369a592D091f20F3Bd2cC29D";
const serverAddress = "0x8beA174F641D239D7f02b9E2d92B8Fd1Cdd75773"; // Change 0xa501
const apiUrl = "API_URL=https://backdice.herokuapp.com";
// const apiUrl = "http://localhost:5000/api";
const websocketUrl = "http://localhost:5001";
const chainId = 1;

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                SENTRY_LOGGING: false,
                REDUX_LOGGING: true,
                CONTRACT_ADDRESS: JSON.stringify(contractAddress),
                SERVER_ADDRESS: JSON.stringify(serverAddress),
                API_URL: JSON.stringify(apiUrl),
                SOCKET_URL: JSON.stringify(websocketUrl),
                CHAIN_ID: JSON.stringify(chainId),
                VERSION: JSON.stringify("dev_server"),
            },
        }),
    ],
});
