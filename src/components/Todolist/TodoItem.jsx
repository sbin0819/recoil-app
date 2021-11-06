import { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { todoListAtom } from 'store';
import useOnClickOutside from 'hook/useOnClickOutside';

export function TodoItem({ todo }) {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
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

  const onSubmitEdit = (e) => {
    e.preventDefault();
    const newTextList = todoList.map((_todo) => {
      if (_todo.id === todo.id) {
        return { ..._todo, text };
      }
      return _todo;
    });
    setTodoList(newTextList);
    setIsEdit(false);
  };

  const onHandleDelete = () => {
    const newTextList = todoList.filter((_todo) => _todo.id !== todo.id);
    setTodoList(newTextList);
  };

  return (
    <div ref={ref}>
      {!isEdit && (
        <li>
          <span>{text}</span>
          <span style={{ marginLeft: 10 }}>
            <button onClick={handleEditMode}>수정</button>
            <button onClick={onHandleDelete}>삭제</button>
          </span>
        </li>
      )}
      {isEdit && (
        <form onSubmit={onSubmitEdit}>
          <input value={text} onChange={onChange} ref={inputRef} />
          <button type="submit">변경</button>
        </form>
      )}
    </div>
  );
}
