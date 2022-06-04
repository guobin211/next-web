export interface Task {
  id: string;
  function: string;
  params: string;
}

export interface DatabaseProps {
  /**
   * 数据存储引擎配置
   */
  driver?: 'localstorage' | 'indexeddb' | 'sessions' | 'cookies' | 'memory' | 'remote';
  /**
   * 时效性
   */
  maxAge?: number;
}
