import { Task } from './database.props';

export class Database {
  set(key: string, value: string) {
    console.log(`Database.set(${key}, ${value})`);
  }

  get(key: string): string | null {
    console.log(`Database.get(${key})`);
    return null;
  }

  commit(t: Task) {
    console.log(`Database.commit(${t.id})`);
  }

  rollback(id: string) {
    console.log(`Database.rollback(${id})`);
  }
}
