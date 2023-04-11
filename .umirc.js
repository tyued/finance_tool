import { join } from 'path';
import routes from './src/routes';

// ref: https://umijs.org/config/
export default {
  define:{
    'process.env.API_BASEPATH': process.env.API_BASEPATH,
    'process.env.REACT_APP_DOMAIN': process.env.REACT_APP_DOMAIN,
    'process.env.REACT_APP_LOGIN_URL': process.env.REACT_APP_LOGIN_URL
  },
  treeShaking: true,
  alias: {
    '@': join(__dirname, 'src'),
  },
  proxy: {
    '/v1': {
      target: 'http://localhost:9011',
      changeOrigin: true,
      pathRewrite: { '^/v1': '/v1' },
    },
  },
  routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        dynamicImport: true,
        hmr: true 
      },
      links: [{ rel: 'icon', href: '/favicon.ico' }],
      dynamicImport: { webpackChunkName: true },
      title: 'finance_tool',
      dll: false,
      routes: {
        exclude: [
          /components\//,
          /model\.(j|t)sx?$/,
          /components\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /services\//
        ],
      },
    }],
  ],
  cssLoaderOptions:{
    // localIdentName:'[local]'
  }
}
