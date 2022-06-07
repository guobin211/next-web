/**
 * 配置postcss
 * @param userConfig
 */
function config(userConfig: Record<string, any> = {}) {
  const { plugins, ...rest } = userConfig;
  return {
    ...rest,
    plugins: [
      'postcss-preset-env',
      {
        autoprefixer: { grid: true, flex: true },
      },
    ],
    ...plugins,
  };
}

function build() {}

export default {
  config,
  build,
};
