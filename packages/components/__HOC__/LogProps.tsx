import React, { useEffect, useRef } from 'react';

/**
 * 获取组件名称
 * @param RC React组件
 */
export const getDisplayName = (RC: any) => RC.displayName || RC.name || 'Component';

const logInfo = (key = '', prev = {}, curr = {}) => {
  console.log(`%c ${key}_current_props`, 'color: #090;');
  console.log(curr);
  console.log(`%c ${key}_previous_props`, 'color: #090;');
  console.log(prev);
};

/**
 * 装饰器，记录组件的props变化
 * @param ClassComponent
 * @example
 * ```
 * @LogProps
 * export class SubmitButton extends React.Component<ButtonProps> {
 *   render() {
 *     return <button type={this.props.type}>{this.props.children}</button>;
 *   }
 * }
 * ```
 */
export function LogProps(ClassComponent: any): typeof ClassComponent {
  if (process.env.NODE_ENV === 'production') {
    return ClassComponent;
  }
  class WithLogProps extends React.Component {
    static displayName = 'WithLogProps';

    componentDidUpdate(prevProps: any) {
      logInfo(getDisplayName(ClassComponent), prevProps, this.props);
    }

    render() {
      return <ClassComponent {...this.props} />;
    }
  }

  return WithLogProps;
}

/**
 * 高阶函数，记录组件的props变化
 * @param FC React.FC
 * @example
 * ```
 * const Button = withLogProps(ButtonFC);
 * ```
 */
export function withLogProps<T = any>(FC: React.FC<T>): React.FC<T> {
  if (process.env.NODE_ENV === 'production') {
    return FC;
  }
  const Component = FC as React.FC;
  const WithLogFC: React.FC = props => {
    const prevRef = useRef<{}>({});
    useEffect(() => {
      logInfo(getDisplayName(FC), prevRef.current, props);
      prevRef.current = props;
    }, [props]);
    return <Component {...props} />;
  };
  WithLogFC.displayName = `withLogProps(${getDisplayName(FC)})`;
  return WithLogFC;
}
