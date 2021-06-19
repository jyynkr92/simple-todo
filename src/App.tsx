import React, { useEffect, useRef, useState } from 'react';
import { Todo } from './store/Todo';
import TodoItem from './components/TodoItem';
import useTodo from './hooks/useTodo';

const PLACEHOLDER = '오늘 할일을 입력해주세요.';

function App() {
  const { getTodoList, insertTodoItem, updateTodoItem, deleteTodoItem, updateTodoItemOrder } = useTodo();
  const [list, setList] = useState<Array<Todo>>([]);
  const [content, setContent] = useState('');
  const draggingItem = useRef<any>();
  const dragOverItem = useRef<any>();

  const onGetTodolist = () => {
    const { status, data } = getTodoList();

    if (status === 200) {
      setContent('');
      setList(data);
    }
  };

  useEffect(() => {
    onGetTodolist();
  }, []);

  const onContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const onContentSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === 'Enter') {
      if (!content.trim()) {
        alert('빈 값은 입력할 수 없습니다.');
        return;
      }

      const { status } = insertTodoItem({ content });

      if (status === 200) {
        onGetTodolist();
      } else {
        alert('추가에 실패하였습니다.');
        return;
      }
    }
  };

  const onDeleteClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const { target } = e.currentTarget.dataset;
    if (!target) return;
    const { status } = deleteTodoItem({ id: target });

    if (status === 200) {
      onGetTodolist();
    } else {
      alert('수정에 실패하였습니다.');
      return;
    }
  };

  const onTodoClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const { target } = e.currentTarget.dataset;
    if (!target) return;
    const { status } = updateTodoItem({ id: target });

    if (status === 200) {
      onGetTodolist();
    } else {
      alert('수정에 실패하였습니다.');
      return;
    }
  };

  const onDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const { idx } = e.currentTarget.dataset;
    if (!idx) return;
    draggingItem.current = parseInt(idx);
  };

  const onDragEnter = (e: React.DragEvent<HTMLLIElement>) => {
    const { idx } = e.currentTarget.dataset;
    if (!idx) return;
    dragOverItem.current = parseInt(idx);
  };

  const onDragEnd = () => {
    const listCopy = [...list];
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = null;
    dragOverItem.current = null;

    const reorderList = listCopy.map((data, idx) => {
      return {
        ...data,
        order: idx,
      };
    });

    const { status } = updateTodoItemOrder({ list: reorderList });

    if (status === 200) {
      onGetTodolist();
    } else {
      alert('수정에 실패하였습니다.');
      return;
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>React Todo</header>
      <form className='Todo-form'>
        <input
          className='Todo-input'
          placeholder={PLACEHOLDER}
          value={content}
          onChange={onContentChange}
          onKeyPress={onContentSubmit}
        />
      </form>
      <ul className='Todo-list'>
        {list.map((data, idx) => (
          <TodoItem
            key={data.id}
            id={data.id}
            idx={idx}
            content={data.content}
            isComplete={data.isComplete}
            onDeleteClick={onDeleteClick}
            onTodoClick={onTodoClick}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
