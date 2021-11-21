import { Suspense, useEffect } from 'react';
import Todolist from 'components/Todolist/Todolist';
import styled from 'styled-components';
import { color1 } from 'styles/colors';
import axios from 'axios';

const TitleContainer = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 40px;
  margin: 30px;
  color: ${color1.primary};
`;

const FallbackContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 60px;
  transform: translateX(-50%);
  width: 100%;
  min-width: 300px;
  max-width: 450px;
  border: 2px solid ${color1.primary};
`;
function Home() {
  const fetch = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    console.log(res);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div style={{ position: 'relative' }}>
      <TitleContainer>TODOS</TitleContainer>
      <Suspense fallback={<FallbackContainer />}>
        <Todolist />
      </Suspense>
    </div>
  );
}

export default Home;
