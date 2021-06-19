import randomStr from 'lib/getRandomStr';
import { useCallback, useEffect, useState } from 'react';
import { Todo } from 'store/Todo';

export default function useTodo(itemList: Array<Todo>) {
  const [list, setList] = useState<Array<Todo>>(itemList);

  const getTodoList = useCallback(() => {
    const { status, data } = getTodos();

    if (status === 200) {
      setList(data);
    }
  }, []);

  useEffect(() => {
    setList(itemList);
  }, []);

  const getTodos = useCallback(() => {
    try {
      const storage = window.localStorage.getItem('list');
      const list = storage ? JSON.parse(storage) : [];

      return { status: 200, data: list };
    } catch (error) {
      return { status: 400, data: [] };
    }
  }, []);

  const insertTodoItem = useCallback(({ content }: { content: string }) => {
    try {
      const id = randomStr();
      const storage = window.localStorage.getItem('list');

      if (!storage) {
        const list = [{ id, content, isComplete: false, order: 0 }];
        window.localStorage.setItem('list', JSON.stringify(list));
        return { status: 200 };
      }

      const list = JSON.parse(storage) as Array<Todo>;
      const todoItem = { id, content, isComplete: false, order: list.length };
      window.localStorage.setItem('list', JSON.stringify(list.concat(todoItem)));
      return { status: 200 };
    } catch (error) {
      return { status: 400 };
    }
  }, []);

  const updateTodoItem = useCallback(({ id }: { id: string }) => {
    try {
      const storage = window.localStorage.getItem('list');
      if (!storage) {
        throw new Error('no storage');
      }

      const list = JSON.parse(storage) as Array<Todo>;
      const todoItem = list.filter((data) => data.id === id)[0];

      if (!todoItem) {
        throw new Error('no item');
      }

      const todoList = list.map((data) => {
        if (data.id === id) {
          data.isComplete = !data.isComplete;
        }
        return data;
      });

      window.localStorage.setItem('list', JSON.stringify(todoList));
      return { status: 200 };
    } catch (error) {
      return { status: 400 };
    }
  }, []);

  const deleteTodoItem = useCallback(({ id }: { id: string }) => {
    try {
      const storage = window.localStorage.getItem('list');
      if (!storage) {
        throw new Error('no storage');
      }

      const list = JSON.parse(storage) as Array<Todo>;
      const todoItem = list.filter((data) => data.id === id)[0];

      if (!todoItem) {
        throw new Error('no item');
      }

      const todoList = list.filter((data) => data.id !== id);

      window.localStorage.setItem('list', JSON.stringify(todoList));
      return { status: 200 };
    } catch (error) {
      return { status: 400 };
    }
  }, []);

  const updateTodoItemOrder = useCallback(({ list }: { list: Array<Todo> }) => {
    try {
      window.localStorage.setItem('list', JSON.stringify(list));
      return { status: 200 };
    } catch (error) {
      return { status: 400 };
    }
  }, []);

  return [list, getTodoList, insertTodoItem, updateTodoItem, deleteTodoItem, updateTodoItemOrder] as [
    Array<Todo>,
    typeof getTodoList,
    typeof insertTodoItem,
    typeof updateTodoItem,
    typeof deleteTodoItem,
    typeof updateTodoItemOrder
  ];
}
