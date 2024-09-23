const path = require('path');
require("dotenv").config();

module.exports = {
    mode: process.env.NODE_ENV || 'development', // Adicionei o modo aqui
    entry: './index.js', // Verifique se o caminho está correto
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: process.env.PORT_WEB || 3000, // Define um valor padrão para a porta
        proxy: [
            {
                context: ['/api'],
                target: `http://${process.env.AUTIP}:${process.env.PORT}`,
                secure: false,
                changeOrigin: true,
            },
        ],
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
        ],
    },
};
