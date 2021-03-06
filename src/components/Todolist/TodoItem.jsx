import { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { todoListSelector } from 'store';
import useOnClickOutside from 'hook/useOnClickOutside';
import styled from 'styled-components';
import { color1 } from 'styles/colors';
import { getDate } from 'lib/utils';

import { TextArea } from 'components/common';

import axios from 'axios';

const Container = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${color1.primary};
  :last-child {
    border-bottom: none;
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

const MainFormArea = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 54px;
  .inputArea {
    width: 100%;
    font-size: 24px;
    border: none;
  }
  .deleteBtn {
    height: 20px;
    width: 50px;
    color: ${color1.red};
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

const SubConatiner = styled.div`
  padding: 3px 50px 16px 55px;

  .date {
    margin-top: 10px;
    padding-left: 8px;
  }
`;

export function TodoItem({ todo }) {
  const mainRef = useRef(null);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [todoList, setTodoList] = useRecoilState(todoListSelector);
  const [title, setTitle] = useState(todo.title);
  const [initContent, setInitContent] = useState(todo.content || '');
  const [content, setContent] = useState(todo.content || '');
  useOnClickOutside(mainRef, async () => {
    setIsEdit(false);
    if (initContent !== content) {
      try {
        setInitContent(content);
        await axios.put(`http://localhost:8888/todos/${todo.id}`, {
          content,
        });
      } catch (err) {
        throw err;
      }
    }
  });

  const handleEditMode = () => setIsEdit(true);

  const onChangeText = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  function handleEditTodoList(obj) {
    return todoList.map((_todo) => {
      if (_todo.id === todo.id) {
        return { ..._todo, ...obj };
      }
      return _todo;
    });
  }

  const onHandleEditTodo = async (e, id) => {
    e.preventDefault();
    const newTodoList = handleEditTodoList({ title: title });
    try {
      await axios.put(`http://localhost:8888/todos/${id}`, {
        title,
      });
      setInitContent(content);
      setTodoList(newTodoList);
      setIsEdit(false);
    } catch (err) {
      throw err;
    }
  };

  const onHandleCompleted = async (id) => {
    const newTodoList = handleEditTodoList({ completed: !todo.completed });
    try {
      await axios.put(`http://localhost:8888/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodoList(newTodoList);
    } catch (err) {
      throw err;
    }
  };

  const onHandleDelete = async (id) => {
    const newTodoList = todoList.filter((_todo) => _todo.id !== todo.id);
    try {
      await axios.delete(`http://localhost:8888/todos/${id}`);
      setTodoList(newTodoList);
    } catch (err) {
      throw err;
    }
  };

  const onChangeContent = (e) => {
    const { value } = e.target;
    setContent(value);
  };

  const onBlurContent = async (id) => {
    const newTodoList = handleEditTodoList({ content });
    try {
      await axios.put(`http://localhost:8888/todos/${id}`, {
        content,
      });
      setTodoList(newTodoList);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  return (
    <Container ref={mainRef}>
      <div style={{ width: '100%' }}>
        <MainFormArea onSubmit={(e) => onHandleEditTodo(e, todo.id)}>
          <CheckboxContainer>
            <input
              className="checkBtn"
              type="checkbox"
              checked={todo.completed}
              onChange={() => onHandleCompleted(todo.id)}
            />
          </CheckboxContainer>
          <input
            className="inputArea"
            value={title}
            onClick={handleEditMode}
            onChange={onChangeText}
            ref={inputRef}
          />
          <button
            className="deleteBtn"
            type="button"
            onClick={() => onHandleDelete(todo.id)}
          >
            X
          </button>
          <button type="submit">??????</button>
        </MainFormArea>
        {isEdit && (
          <SubConatiner>
            <div>
              <TextArea
                value={content}
                onChange={(e) => onChangeContent(e)}
                onBlur={() => onBlurContent(todo.id)}
                placeholder="notes"
              />
            </div>
            <div className="date">{getDate(todo.updatedAt)}</div>
          </SubConatiner>
        )}
      </div>
    </Container>
  );
}
