import React, { useEffect, useRef, useState } from 'react';
import TodoItem from './components/TodoItem';
import useTodo from './hooks/useTodo';

const PLACEHOLDER = '오늘 할일을 입력해주세요.';

function App() {
  const [list, getTodoList, insertTodoItem, updateTodoItem, deleteTodoItem, updateTodoItemOrder] = useTodo([]);
  const [content, setContent] = useState('');
  const draggingItem = useRef<any>();
  const dragOverItem = useRef<any>();

  useEffect(() => {
    getTodoList();
  }, []);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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

      insertTodoItem({ content });
      setContent('');
    }
  };

  const onDeleteClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const { target } = e.currentTarget.dataset;
    if (!target) return;
    deleteTodoItem({ id: target });
  };

  const onTodoClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const { target } = e.currentTarget.dataset;
    if (!target) return;
    updateTodoItem({ id: target });
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

    updateTodoItemOrder({ list: reorderList });
  };

  return (
    <div className='App'>
      <header className='App-header'>React Todo</header>
      <form className='Todo-form' onSubmit={onFormSubmit}>
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
