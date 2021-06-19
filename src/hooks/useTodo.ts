import randomStr from 'lib/getRandomStr';
import { Todo } from 'store/Todo';

export default function useTodo() {
  const getTodoList = () => {
    try {
      const storage = window.localStorage.getItem('list');
      const list = storage ? JSON.parse(storage) : [];

      return { status: 200, data: list };
    } catch (error) {
      return { status: 400, data: [] };
    }
  };

  const insertTodoItem = ({ content }: { content: string }) => {
    try {
      const id = randomStr();
      const storage = window.localStorage.getItem('list');

      if (!storage) {
        const list = [{ id, content, isComplete: false }];
        window.localStorage.setItem('list', JSON.stringify(list));
        return { status: 200 };
      }

      const list = JSON.parse(storage) as Array<Todo>;
      const todoItem = { id, content, isComplete: false };
      window.localStorage.setItem('list', JSON.stringify(list.concat(todoItem)));
      return { status: 200 };
    } catch (error) {
      return { status: 400 };
    }
  };

  return {
    getTodoList,
    insertTodoItem,
  };
}
