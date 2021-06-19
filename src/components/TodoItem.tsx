import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Tick } from 'Icons/tick.svg';
import { ReactComponent as Done } from 'Icons/done.svg';
import { ReactComponent as Delete } from 'Icons/x-mark.svg';

interface TodoItemProps {
  id: string;
  content: string;
  isComplete: boolean;
  onDeleteClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  onTodoClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}

function TodoItem({ id, content, isComplete, onDeleteClick, onTodoClick }: TodoItemProps) {
  return (
    <li className='Todo-item'>
      {!isComplete && <Tick className='Todo-check-icon' onClick={onTodoClick} data-target={id} />}
      {isComplete && <Done className='Todo-check-icon' onClick={onTodoClick} data-target={id} />}
      <TodoContent isComplete={isComplete} className='Todo-text'>
        {content}
      </TodoContent>
      <Delete className='Todo-delete-icon' onClick={onDeleteClick} data-target={id} />
    </li>
  );
}

interface TodoContentProps {
  isComplete: boolean;
}

const TodoContent = styled.p<TodoContentProps>`
  text-decoration: ${({ isComplete }) => (isComplete ? `line-through` : `normal`)};
`;

export default TodoItem;
