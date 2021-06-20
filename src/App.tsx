import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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

  const onTodoClick = (e: React.MouseEvent<SVGSVGElement | HTMLParagraphElement>) => {
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
    <AppDiv className='App'>
      <AppHeader className='App-header'>React Todo</AppHeader>
      <TodoFrom className='Todo-form' onSubmit={onFormSubmit}>
        <input
          className='Todo-input'
          placeholder={PLACEHOLDER}
          value={content}
          onChange={onContentChange}
          onKeyPress={onContentSubmit}
        />
      </TodoFrom>
      <TodoList className='Todo-list'>
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
      </TodoList>
    </AppDiv>
  );
}

const AppDiv = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppHeader = styled.header`
  font-size: 48px;
  font-weight: bold;
  color: #4d4d60;
  text-align: center;
  padding-bottom: 32px;
`;

const TodoFrom = styled.form`
  width: 70%;
  max-width: 680px;
  margin-bottom: 16px;
  padding: 0 8px;
  border-bottom: 1px solid #979797;

  input {
    border: none;
    padding: 0;
    margin: 0;

    &:focus {
      outline: unset;
    }

    &.Todo-input {
      width: 100%;
      font-size: 20px;
      line-height: 1.6;
      color: #4d4d60;

      &::placeholder {
        color: #b5b7bf;
      }
    }
  }
`;

const TodoList = styled.ul`
  width: 70%;
  max-width: 680px;
  height: 100%;
  margin: 0;
  padding: 0;
`;

export default App;
