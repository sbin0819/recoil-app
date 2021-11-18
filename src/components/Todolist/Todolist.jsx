import { useRecoilState } from 'recoil';
import { todoListSelector, textAtom } from 'store';
import { TodoItem } from './TodoItem';
import axios from 'axios';

function Todolist() {
  const [todoList, setTodoList] = useRecoilState(todoListSelector);
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
    try {
      const { data } = await axios.post('http://localhost:8888/todos', newText);
      setTodoList((prev) => [...prev, data]);
    } catch (err) {
      throw err;
    }
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
