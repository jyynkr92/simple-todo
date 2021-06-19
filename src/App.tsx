import React, { useEffect, useState } from 'react';
import { Todo } from './store/Todo';
import TodoItem from './components/TodoItem';
import useTodo from './hooks/useTodo';

const PLACEHOLDER = '오늘 할일을 입력해주세요.';

function App() {
  const { getTodoList, insertTodoItem, updateTodoItem, deleteTodoItem } = useTodo();
  const [list, setList] = useState<Array<Todo>>([]);
  const [content, setContent] = useState('');

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
        {list.map((data) => (
          <TodoItem
            key={data.id}
            id={data.id}
            content={data.content}
            isComplete={data.isComplete}
            onDeleteClick={onDeleteClick}
            onTodoClick={onTodoClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
