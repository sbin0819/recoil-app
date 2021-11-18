import { useEffect, Suspense } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { todoListAtom, textAtom, todoListSelector } from 'store';
import { TodoItem } from './TodoItem';
import axios from 'axios';

function Todolist() {
  const todoList = useRecoilValue(todoListAtom);
  const [_, setTodoList] = useRecoilState(todoListSelector);
  const [text, setText] = useRecoilState(textAtom);

  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newText = {
      text,
    };
    setTodoList(newText);
  };

  console.log(todoList);

  return (
    <div>
      <h3>Todo List</h3>
      <form onSubmit={onSubmit}>
        <input value={text} onChange={onChange} />
        <button type="submit">submit</button>
      </form>
      {todoList.map((todo, i) => (
        <ul key={i}>
          <TodoItem todo={todo} />
        </ul>
      ))}
    </div>
  );
}

export default Todolist;
