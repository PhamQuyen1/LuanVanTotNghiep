// module.exports = {
//     devServer(configFunction) {
//         return (proxy, allowedHost) => {
//             const config = configFunction(proxy, allowedHost);
//             config.watchOptions.ignored = ['public', 'node_modules'];
//             return config;
//         };
//     },
// };
// module.exports = {
//     devServer: {
//         watchOptions: {
//             ignored: ['node_modules', 'public'
//                 // path.resolve(__dirname, 'node_modules'),
//                 // path.resolve(__dirname, 'public') // image folder path
//             ]
//         }
//     },
// }