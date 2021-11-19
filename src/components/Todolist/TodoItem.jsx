import { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { todoListSelector } from 'store';
import useOnClickOutside from 'hook/useOnClickOutside';
import axios from 'axios';

export function TodoItem({ todo }) {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [todoList, setTodoList] = useRecoilState(todoListSelector);
  const [text, setText] = useState(todo.text);
  useOnClickOutside(ref, () => setIsEdit(false));

  const handleEditMode = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const onSubmitEdit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8888/todos/${id}`, { text });
      const newTextList = todoList.map((_todo) => {
        if (_todo.id === todo.id) {
          return { ..._todo, text };
        }
        return _todo;
      });
      setTodoList(newTextList);
      setIsEdit(false);
    } catch (err) {
      throw err;
    }
  };

  const onHandleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/todos/${id}`);
      const newTextList = todoList.filter((_todo) => _todo.id !== todo.id);
      setTodoList(newTextList);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div ref={ref}>
      {!isEdit && (
        <li>
          <span>{text}</span>
          <span style={{ marginLeft: 10 }}>
            <button onClick={handleEditMode}>수정</button>
            <button onClick={() => onHandleDelete(todo.id)}>삭제</button>
          </span>
        </li>
      )}
      {isEdit && (
        <form onSubmit={(e) => onSubmitEdit(e, todo.id)}>
          <input value={text} onChange={onChange} ref={inputRef} />
          <button type="submit">변경</button>
        </form>
      )}
    </div>
  );
}
