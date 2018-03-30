const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index.js', //相对路径
    output: {
        path: path.resolve(__dirname, 'build'), //打包文件的输出路径
        filename: 'bundle.js' //打包文件名
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            // style: path.join(__dirname, './src/style'),
            css: path.join(__dirname, './src/css'),
        },
    	extensions: ['.js', '.css']
  	},
    module: {
        rules: [ //配置加载器
            {
                test: /\.js$/, //配置要处理的文件格式，一般使用正则表达式匹配
                loader: 'babel-loader', //使用的加载器名称
                query: { //babel的配置参数，可以写在.babelrc文件里也可以写在这里
                    presets: ['env', 'react', 'es2015']
                },           

            },
            /*{
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('css-loader?sourceMap'),
                include: path.resolve(__dirname, 'src/style'),
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('css-loader?modules&localIdentName="[name]-[local]-[hash:base64:6]"'),
                exclude:[path.resolve(__dirname, 'src/style'), path.resolve(__dirname, 'node_modules')],
            },*/
            /*{
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style-loader','css-loader?sourceMap'),
                exclude:'/src/css',
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style-loader','css-loader?modules&localIdentName=[name]__[local]'),
                exclude:['/src/style', '/node_modules/'],
            },*/
            {
                test:/\.css$/,
                use:ExtractTextWebpackPlugin.extract({
                    use:[
                        {
                            loader: 'css-loader',
                        }
                    ],
                    fallback: 'style-loader',
                }),
                //替换成项目中需要import './src/style'的路径
                include: path.resolve(__dirname, 'src/style'),
            },
            {
                test:/\.css$/,
		        use:ExtractTextWebpackPlugin.extract({
		        	use:[
		        			{
				           		loader: 'css-loader',
				           		options: {
				           			modules: true,
				        		},
			        		}
		        		],
		            fallback: 'style-loader',
		        }),
                //替换成项目中需要import style from './src/css',比如上面的不需要css-modules的文件夹路径
                exclude:[path.resolve(__dirname, 'src/style'), path.resolve(__dirname, 'node_modules')],
		     },
            /*{
            	test: /\.css/,
	            loader: 'postcss-loader',
	            options: {
	                plugins: () => [
	                    require('autoprefixer'),
	                    require('postcss-flexbugs-fixes')
	                ]
	            }
            
        	}*/
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', //指定模板路径
            filename: 'index.html', //指定文件名
        }),
        new ExtractTextWebpackPlugin({filename: "bundle.css",allChunks: true}),
    ]
}
