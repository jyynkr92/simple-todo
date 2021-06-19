import React, { useState } from 'react';
import { ReactComponent as Tick } from './Icons/tick.svg';
import { ReactComponent as Done } from './Icons/done.svg';
import { ReactComponent as Delete } from './Icons/x-mark.svg';
import { Todo } from './store/Todo';
import TodoItem from './components/TodoItem';

const PLACEHOLDER = '오늘 할일을 입력해주세요.';

function App() {
  const [list, setList] = useState<Array<Todo>>([]);

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
        <li className='Todo-item'>
          <Tick className='Todo-check-icon' />
          <p className='Todo-text'>javascript.info에서 javascript 공부</p>
          <Delete className='Todo-delete-icon' />
        </li>
        <li className='Todo-item'>
          <Tick className='Todo-check-icon' />
          <p className='Todo-text'>javascript.info에서 javascript 공부</p>
          <Delete className='Todo-delete-icon' />
        </li>
        <li className='Todo-item__done'>
          <Done className='Todo-check-icon__done' />
          <p className='Todo-text'>javascript.info에서 javascript 공부</p>
          <Delete className='Todo-delete-icon' />
        </li>
      </ul>
    </div>
  );
}

export default App;
