import React, { useEffect, useState } from 'react';
import { Todo } from './store/Todo';
import TodoItem from './components/TodoItem';
import useTodo from './hooks/useTodo';

const PLACEHOLDER = '오늘 할일을 입력해주세요.';

function App() {
  const { getTodoList } = useTodo();
  const [list, setList] = useState<Array<Todo>>([]);

  useEffect(() => {
    getTodoList();
  }, []);

  const onDeleteClick = (e: React.MouseEvent<SVGSVGElement>) => {};
  const onTodoClick = (e: React.MouseEvent<SVGSVGElement>) => {};

  return (
    <div className='App'>
      <header className='App-header'>React Todo</header>
      <form className='Todo-form'>
        <input className='Todo-input' placeholder={PLACEHOLDER} />
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
