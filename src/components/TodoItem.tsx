import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Tick } from './Icons/tick.svg';
import { ReactComponent as Done } from './Icons/done.svg';
import { ReactComponent as Delete } from './Icons/x-mark.svg';

interface TodoItemProps {
  id: string;
  content: string;
  isComplete: boolean;
  onDeleteClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  onTodoClick: (e: React.MouseEvent<SVGSVGElement>) => void;
}

function TodoItem({ id, content, isComplete, onDeleteClick, onTodoClick }: TodoItemProps) {
  return (
    <TodoLI className='Todo-item' isComplete={isComplete}>
      {!isComplete && <Tick className='Todo-check-icon' onClick={onTodoClick} data-target={id} />}
      {isComplete && <Done className='Todo-check-icon' onClick={onTodoClick} data-target={id} />}
      <p className='Todo-text'>{content}</p>
      <Delete className='Todo-delete-icon' onClick={onDeleteClick} id={id} />
    </TodoLI>
  );
}

interface TodoLIProps {
  isComplete: boolean;
}

const TodoLI = styled.li<TodoLIProps>`
  text-decoration: ${({ isComplete }) => (isComplete ? `underline` : `normal`)};
`;

export default TodoItem;
