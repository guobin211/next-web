export const PREFIX = 'ui';
export const CLASS_PREFIX = `${PREFIX}-`;

/**
 * 拼接className
 * @param base 基础className `btn` --> `ui-btn`
 * @param input 外部传入的className `active` --> `ui-btn active`
 */
export function pf(base: string, input = '') {
  return `${CLASS_PREFIX}${base} ${input}`;
}
