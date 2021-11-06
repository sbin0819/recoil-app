import { useRecoilState } from 'recoil';
import { todoListAtom, textAtom } from 'store';
import { TodoItem } from './TodoItem';
function Todolist() {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [text, setText] = useRecoilState(textAtom);

  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newText = {
      id: todoList.length,
      text,
    };
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
