import { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { todoListSelector } from 'store';
import useOnClickOutside from 'hook/useOnClickOutside';
import styled from 'styled-components';
import { color1 } from 'styles/colors';

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${color1.primary};

  .inputArea {
    height: 54px;
    width: 100%;
    font-size: 24px;
    border: none;
  }
  .deleteBtn {
    height: 20px;
    width: 50px;
    color: red;
    border: none;
    outline: none;
    background: none;
    font-size: 18px;
    font-weight: bold;
  }

  button[type='submit'] {
    display: none;
  }
`;

const CheckboxContainer = styled.div`
  input[type='checkbox'] {
    appearance: none;
    margin: 0 10px;
    font: inherit;
    color: currentColor;
    width: 2.15em;
    height: 2.15em;
    border: 0.15em solid currentColor;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }

  input[type='checkbox']::before {
    content: '';
    width: 1.15em;
    height: 1.35em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }
  input[type='checkbox']:checked::before {
    background: ${color1.primary};
    transform: scale(1);
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

  const onChangeText = (e) => {
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

  const onHandleCompleted = () => {
    const newTextList = todoList.map((_todo) => {
      if (_todo.id === todo.id) {
        return { ..._todo, completed: !_todo.completed };
      }
      return _todo;
    });
    setTodoList(newTextList);
  };

  const onHandleDelete = () => {
    const newTextList = todoList.filter((_todo) => _todo.id !== todo.id);
    setTodoList(newTextList);
  };

  return (
    <StyledForm ref={ref} onSubmit={onSubmitEdit} onClick={handleEditMode}>
      <CheckboxContainer>
        <input
          className="checkBtn"
          type="checkbox"
          checked={todo.completed}
          onChange={onHandleCompleted}
        />
      </CheckboxContainer>
      <input
        className="inputArea"
        value={text}
        onChange={onChangeText}
        ref={inputRef}
      />
      <button className="deleteBtn" type="button" onClick={onHandleDelete}>
        X
      </button>
      <button type="submit">변경</button>
    </StyledForm>
  );
}
