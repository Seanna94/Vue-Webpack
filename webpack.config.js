const path=require('path')   //path为node.js的基本包，处理路径问题
const HTMLPlugin=require('html-webpack-plugin')  //引入html插件
const webpack=require('webpack')
const { VueLoaderPlugin } = require("vue-loader");
const isDEV= process.env.NODE_ENV === 'development'
const ExtractPlugin =require('extract-text-webpack-plugin')  //jiyu Webpack3.0dabao css


const config={
    target:'web',
    entry:path.join(__dirname,'src/index.js'),   //生成绝对路径,__dirname代表当前路径的地址，也就是根目录，join是把路径拼接在一起
    output:{                                    //输出文件的路径和文件名        
        filename:'bundele.[md5:contentHash:hex:8].js',
        path:path.join(__dirname,'dist')
    },

    module:{    //处理各种文件
        rules:[   //编写各种规则
            {
                test:/.vue$/,
                loader:'vue-loader'   //使用vue-loader处理以.vue结尾的文件，输出js代码
            },
            {
                test:/.jsx$/,
                loader:'babel-loader'   //使用babel-loader处理以.jsx结尾的文件，输出js代码
            },
            // {
            //     test:/.css$/,
            //     use:[
            //         'style-loader',   //使用将css插入到html文件中的方法加载css，最终会打包成js文件
            //         'css-loader'
            //     ]
            // },
            // {
            //     test:/\.styl/,     //使用stylus预处理css文件
            //     use:[
            //         'style-loader',
            //         'css-loader',
            //         {
            //             loader:'postcss-loader',
            //             options:{
            //               sourceMap:true,
            //             }
            //         },
            //         'stylus-loader'
            //     ]
            // },
        
            {
                test:/\.(gif|png|jpg|jpeg|svg)$/,  //处理各种类型的文件，将图片转义称base64代码，写到代码里面去
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'  //[name]原本的文件名，[ext]扩展名
                        }
                        
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDEV ? '"develpoment"' : '"production"'
            }
        }),
        new HTMLPlugin() ,  //加入HTMLPlugin
        new VueLoaderPlugin()
    ],
    mode: 'development' // 设置mode
}

//判断当前环境
if(isDEV){
    config.module.rules.push(
    {
                test:/\.styl/,     //使用stylus预处理css文件
                use:[
                    'style-loader',
                    'css-loader',
                    {  
                        loader:'postcss-loader',
                        options:{
                          sourceMap:true,
                        }
             },
                    'stylus-loader'
           ]
        
    })
    config.devtool ='#cheap-module-eval-source-map'  //映射代码，使vue可以在浏览器调试
    config.devServer ={
        port:8000,
        host:'localhost',//可以在本机访问，也可以在内网访问
        overlay:{
            errors:true,
        },
        hot:true,   //只渲染当前页面数据，不重新加载页面
        // historyFallback:{ //处理路由映射
        // }
        // open:true   //打包的时候打开浏览器
    }
    
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
    config.optimization = {
        splitChunks: {
          cacheGroups: {
            commons: {
              chunks: 'initial',
              minChunks: 2, maxInitialRequests: 5,
              minSize: 0
            },
            vendor: {
              test: /node_modules/,
              chunks: 'initial',
              name: 'vendor',
              priority: 10,
              enforce: true
            }
    
          }
    
        },
    
        runtimeChunk: true
      }
}else{
    config.entry = {
        app: path.join(__dirname,'src/index.js'),
        vendor: ['vue']   
    }

    config.output.filename = '[name].[chunkhash:8].js'  //此处一定是chunkhash,因为用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义.
    config.module.rules.push(
        {
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',                       //css-loader处理css
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,            //stylus-loader和postcss-loader自己都会生成sourceMap,如果前面stylus-loader已生成了sourceMap
                        }                               //那么postcss-loader可以直接引用前面的sourceMap
                    },
                    'stylus-loader'                     //处理stylus的css预处理器的问题件,转换成css后,抛给上一层的css-loader
                ]
            })
        },
    ),
config.plugins.push(
    new ExtractPlugin('styles.[md5:contentHash:8].css'),   //定义打包分离出的css文件名
    // new webpack.optimize.CommonsChunkPlugin({          //定义静态文件打包
    //     name: 'vendor'
    // }),
    // new webpack.optimize.CommonsChunkPlugin({         //将app.js文件中一些关于webpack文件的配置单独打包出为一个文件,用于解决部分浏览器长缓存问题   
    //     name: 'runtime'
    // })
)
}

module.exports=config