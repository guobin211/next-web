import merge from 'webpack-merge';
import webpack, { container } from 'webpack';

/**
 * 生成webpack配置
 * @param userConfig
 */
function config(userConfig: UserConfig): webpack.Configuration {
  console.log('next-config webpack config');
  const { globalName, remoteEntry, ...rest } = userConfig;
  const config: webpack.Configuration = {
    optimization: {},
    module: {},
    plugins: [
      new container.ModuleFederationPlugin({
        shared: ['react', 'react-dom'],
      }),
    ],
  };
  return merge(rest, config, {});
}

/**
 * webpack构建
 * @param userConfig
 */
function build(userConfig: UserConfig) {
  const compiler = webpack(config(userConfig));
  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    if (stats) {
      console.log(stats.toString());
    }
  });
}

interface UserConfig extends webpack.Configuration {
  /**
   * UMD格式全局变量名
   */
  globalName?: string;
  /**
   * 远程入口文件
   */
  remoteEntry?: string;
}

export default {
  config,
  build,
};
