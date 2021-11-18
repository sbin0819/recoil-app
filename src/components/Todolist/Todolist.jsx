import { useEffect, Suspense } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { todoListAtom, textAtom, todoListSelector } from 'store';
import { TodoItem } from './TodoItem';
import axios from 'axios';

function Todolist() {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [text, setText] = useRecoilState(textAtom);

  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newText = {
      text,
    };
    await axios.post('http://localhost:8888/todos', newText);
    setTodoList((prev) => [...prev, newText]);
  };

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
