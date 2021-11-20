import { Fragment, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { todoListSelector, textAtom } from 'store';
import { TodoItem } from './TodoItem';
import axios from 'axios';

import styled from 'styled-components';
import { color1 } from 'styles/colors';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 60px;
  transform: translateX(-50%);
  width: 100%;
  min-width: 300px;
  max-width: 450px;
  border: 2px solid ${color1.primary};
`;
const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  input {
    height: 54px;
    width: 100%;
    font-size: 24px;
    padding: 0 50px 0 15px;
    border: none;
    border-bottom: 2px solid ${color1.primary};
  }
  button {
    display: none;
  }
`;
const ListContainer = styled.div`
  height: 432px;
  overflow: scroll;
`;

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
      setText('');
    } catch (err) {
      throw err;
    }
  };

  return (
    <Container>
      <StyledForm onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="할 일을 입력해주세요..."
          value={text}
          onChange={onChange}
        />
        <button type="submit">submit</button>
      </StyledForm>
      <ListContainer>
        {todoList.map((todo) => (
          <Fragment key={todo.id}>
            <TodoItem todo={todo} />
          </Fragment>
        ))}
      </ListContainer>
    </Container>
  );
}

export default Todolist;
