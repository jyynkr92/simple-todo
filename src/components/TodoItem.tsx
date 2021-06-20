import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Tick } from 'Icons/tick.svg';
import { ReactComponent as Done } from 'Icons/done.svg';
import { ReactComponent as Delete } from 'Icons/x-mark.svg';

interface TodoItemProps {
  id: string;
  idx: number;
  content: string;
  isComplete: boolean;
  onDeleteClick: (e: React.MouseEvent<SVGSVGElement>) => void;
  onTodoClick: (e: React.MouseEvent<SVGSVGElement | HTMLParagraphElement>) => void;
  onDragStart: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
}

function TodoItem({
  id,
  idx,
  content,
  isComplete,
  onDeleteClick,
  onTodoClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: TodoItemProps) {
  return (
    <TodoLi
      className='Todo-item'
      isComplete={isComplete}
      draggable={true}
      data-idx={idx}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
    >
      {!isComplete && <Tick className='Todo-check-icon' onClick={onTodoClick} data-target={id} />}
      {isComplete && <Done className='Todo-check-icon' onClick={onTodoClick} data-target={id} />}
      <p className='Todo-text' onClick={onTodoClick} data-target={id}>
        {content}
      </p>
      <Delete className='Todo-delete-icon' onClick={onDeleteClick} data-target={id} />
    </TodoLi>
  );
}

interface TodoLiProps {
  isComplete: boolean;
}

const TodoLi = styled.li<TodoLiProps>`
  display: flex;
  align-items: baseline;
  list-style: none;
  width: 100%;
  height: 40px;
  margin-bottom: 4px;
  line-height: 40px;

  .Todo-text {
    cursor: pointer;
    margin: 0;
    font-size: 18px;
    text-decoration: ${({ isComplete }) => (isComplete ? `line-through` : `normal`)};
    color: ${({ isComplete }) => (isComplete ? `#B5B7BF` : '#4D4D60')};
  }
  .Todo-check-icon {
    width: 16px;
    height: 16px;
    fill: #d7d9e0;
    margin-right: 8px;
    cursor: pointer;
  }

  .Todo-delete-icon {
    width: 16px;
    height: 16px;
    fill: #b5b7bf;
    margin-left: auto;
    margin-right: 16px;
    cursor: pointer;
    display: none;
  }

  &:hover {
    .Todo-delete-icon {
      display: inline-block;
    }

    .Todo-check-icon {
      fill: #3ce6be;
    }
  }
`;

export default TodoItem;
