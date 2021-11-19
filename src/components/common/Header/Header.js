import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 20px;
  height: 50px;
  align-items: center;
  font-size: 24px;
  background: coral;
  margin-bottom: 30px;
`;
function Header(props) {
  return (
    <Container>
      <Link to="/">Home</Link>
      <Link to="/search">Search</Link>
    </Container>
  );
}

export default Header;
