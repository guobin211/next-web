import merge from 'webpack-merge';
import webpack, { container } from 'webpack';

/**
 * 生成webpack配置
 * @param fc
 */
function config(fc: FederationConfig): webpack.Configuration {
  const { name, filename, remotes, exposes, ...wc } = fc;
  const config: webpack.Configuration = {
    plugins: [
      new container.ModuleFederationPlugin({
        name,
        filename,
        remotes,
        exposes,
        shared: {
          react: {
            singleton: true,
          },
          'react-dom': {
            singleton: true,
          },
        },
      }),
    ],
  };
  return merge(wc, config);
}

/**
 * webpack构建
 * @param fc
 */
function build(fc: FederationConfig) {
  const compiler = webpack(config(fc));
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

interface FederationConfig extends webpack.Configuration {
  /**
   * UMD格式全局变量名
   */
  name?: string;
  filename?: string;
  remotes?: Record<string, string>;
  exposes?: Record<string, string>;
}

export default {
  config,
  build,
};
