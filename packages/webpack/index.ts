import webpack from 'webpack';
import merge from 'webpack-merge';

/**
 * 自动配置webpack
 * @example
 * import { config } from '@tencent/next-webpack'
 *
 * config({
 *   entry: './index.ts',
 * })
 *
 */
export function config(props: NextWebpackProps): webpack.Configuration {
  return merge(props);
}

/**
 * 打包库
 * 会自动打包成ESM,CJS,UMD三种格式
 * @example
 * import build from '@tencent/next-webpack'
 *
 * build({
 *   entry: './index.ts',
 * })
 *
 */
export default function build(props: NextWebpackProps) {
  webpack(merge(props)).run(() => {});
}

/**
 * webpack打包配置
 * 默认采用@swc/core进行打包
 */
export interface NextWebpackProps extends webpack.Configuration {
  entry: string;
  format?: 'esm' | 'cjs' | 'umd';
}
