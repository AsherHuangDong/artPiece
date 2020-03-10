module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "assets",
    lintOnSave: true,
    devServer: {
      port: 8080,
      host: '0.0.0.0',
      open: true,
      overlay: {
        warnings: true,
        errors: true
      },
      proxy:{
        // '/api':{
        //   target:'http://39.104.181.213:8667',
        //   changeOrigin:true,
        //   pathRewrite:{
        //     '^/api':'/api'
        //   }
        // },
        '/api':{
          // target:'https://testweb.artpiece.com',
          target:'http://test111www.chaindown.com',
          changeOrigin:true,
          pathRewrite:{
            '^/api':'/api'
          }
        },
        '/mycurrency':{
          target:'https://www.mycurrency.net/US.json',
          changeOrigin:true,
          pathRewrite:{
            '':''
          }
        },
        '/chainDown':{
          // https://testwebapi.artpiece.com
          // http://test111webapi.chaindown.com
          target:'http://test111webapi.chaindown.com',
          changeOrigin:true,
          pathRewrite:{
            '^/chainDown':''
          }
        }
      }
    },
    configureWebpack: {
      resolve: {
        alias: {
          src: "@",
          assets: "@/assets",
          components: "@/components",
          views: "@/views",
          utils: "@/utils",
          api: "@/api/api"
        }
      }
    }
  };
