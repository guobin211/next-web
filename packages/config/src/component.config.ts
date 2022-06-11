import fs from 'fs';
import path from 'path';
/**
 * 组件结构
 */
export interface ComponentConfig {
  /**
   * 组件入口
   */
  entry: string;
  /**
   * 组件实现
   */
  component: string;
  /**
   * 组件类型定义
   */
  props: string;
  /**
   * 组件测试
   */
  test: string;
  /**
   * 组件样式
   */
  style: string;
  /**
   * 组件context定义
   */
  context: string;
  /**
   * 组件文档
   */
  doc: string;
}

/**
 * 配置组件化
 * @param name 组件名称
 * @example configComponent('button')
 * 将生成目录结构
 * ```
 * button
 *  |-index.tsx
 *  |-index.scss
 *  |-Button.test.tsx
 *  |-Button.context.tsx
 *  |-Button.props.tsx
 *  |-Button.tsx
 *  |-Button.md
 * ```
 */
export function config(name: string): ComponentConfig {
  const upName = name.toUpperCase();
  return {
    entry: 'index.tsx',
    component: `${upName}.tsx`,
    props: `${upName}.props.ts`,
    test: `${upName}.test.tsx`,
    style: 'index.scss',
    context: `${upName}.context.tsx`,
    doc: `${upName}.md`,
  };
}

export function build(name: string, dir: string) {
  Object.values(config(name)).forEach((filename) => {
    const file = path.join(dir, filename);
    fs.writeFile(file, '', 'utf8', () => {});
  });
}
