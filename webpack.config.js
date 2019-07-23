const path=require('path')   //path为node.js的基本包，处理路径问题
const HTMLPlugin=require('html-webpack-plugin')  //引入html插件
const webpack=require('webpack')
const { VueLoaderPlugin } = require("vue-loader");
const isDEV= process.env.NODE_ENV === 'development'


const config={
    target:'web',
    entry:path.join(__dirname,'src/index.js'),   //生成绝对路径,__dirname代表当前路径的地址，也就是根目录，join是把路径拼接在一起
    output:{                                    //输出文件的路径和文件名        
        filename:'bundele.js',
        path:path.join(__dirname,'dist')
    },
    module:{    //处理各种文件
        rules:[   //编写各种规则
            {
                test:/.vue$/,
                loader:'vue-loader'   //使用vue-loader处理以.vue结尾的文件，输出js代码
            },
            {
                test:/.css$/,
                use:[
                    'style-loader',   //使用将css插入到html文件中的方法加载css，最终会打包成js文件
                    'css-loader'
                ]
            },
            {
                test:/\.styl/,     //使用stylus预处理css文件
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
        
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
    ]
}

//判断当前环境
if(isDEV){
    config.devtool ='#cheap-module-eval-source-map'  //映射代码，使vue可以在浏览器调试
    config.devServer ={
        port:8000,
        host:'0.0.0.0',//可以在本机访问，也可以在内网访问
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
}

module.exports=config