import { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { todoListSelector } from 'store';
import useOnClickOutside from 'hook/useOnClickOutside';
import styled from 'styled-components';
import { color1 } from 'styles/colors';

const StyledForm = styled.form`
  input {
    height: 54px;
    width: 100%;
    font-size: 24px;
    padding: 0 80px 0 15px;
    border: none;
    border-bottom: 2px solid ${color1.primary};
  }
  button[type='button'] {
    margin-left: -50px;
    height: 20px;
    width: 50px;
    color: red;
    border: none;
    outline: none;
    background: none;
  }
  button[type='submit'] {
    display: none;
  }
`;

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
    console.log(todo.id);
    const newTextList = todoList.filter((_todo) => _todo.id !== todo.id);
    console.log(newTextList);
    // setTodoList(newTextList);
  };

  return (
    <StyledForm ref={ref} onSubmit={onSubmitEdit} onClick={handleEditMode}>
      <input value={text} onChange={onChange} ref={inputRef} />
      <button type="button" onClick={onHandleDelete}>
        X
      </button>
      <button type="submit">변경</button>
    </StyledForm>
  );
}
