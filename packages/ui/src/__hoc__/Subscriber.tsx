import React from 'react';

interface Observable<T> {
  subscribe(subscriber: Subscriber<T>): UnSubscriber;
}

type Subscriber<T = any> = (value: T) => void;
type UnSubscriber = () => void;

/**
 * Class组件订阅数据
 * @example
 * ```
 * // 订阅指定的字段
 * @Subscribe(store, store => ({ name: store.user.name }))
 * class Card extends Component<CardProps, CardState> {
 *
 *   render() {
 *     return (
 *       <p>this.props.name</p>
 *     )
 *   }
 * }
 * ```
 *
 * // 订阅指定的store, 数据在$store中
 * ```
 * @Subscribe(store)
 * class Card extends SubscriberComponent<CardProps, CardState> {
 *
 *   render() {
 *     return (
 *       <p>this.props.$store</p>
 *     )
 *   }
 * }
 * ```
 *
 * // 订阅redux, 数据在$store中
 * ```
 * @Subscribe
 * class Card extends SubscriberComponent<CardProps, CardState> {
 *
 *   render() {
 *     return (
 *       <p>this.props.$store</p>
 *     )
 *   }
 * }
 * ```
 */
export function Subscribe() {}

/**
 * 组件订阅数据
 * @param fc 组件
 * @param observable 可被订阅数据源
 * @example
 *
 * ```typescript
 *
 * interface ButtonProps {}
 * interface PayProps {
 *   price: number
 * }
 *
 * const Button: ReactFC<ButtonProps & PayProps> = (props) => {
 *   return (
 *     <button>price: { props.price }</button>
 *   )
 * }
 *
 * const selector: (state): PayProps = (state: any) => ({ price: state.price });
 *
 * const BuyButton = withSubscribe<ButtonProps, PayProps>(Button, store, selector);
 * ```
 */
export function withSubscribe<P, S>(fc: React.FC<P & S>, observable: Observable<S>): React.FC<P> {
  const Component = fc as React.FC;

  class WithSubscribe extends React.Component<P> {
    static displayName = 'WithSubscribe';
    unsubscribe: UnSubscriber | undefined;

    componentDidMount() {
      this.unsubscribe = observable.subscribe(this.handleChange);
    }

    componentWillUnmount() {
      this.unsubscribe?.();
    }

    handleChange = ($store: S) => {
      this.setState({ $store });
    };

    render() {
      return <Component {...this.state} {...this.props} />;
    }
  }

  return WithSubscribe as any;
}
