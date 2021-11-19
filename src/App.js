import GlobalStyle from 'styles/GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Search from 'pages/Search/Search';
function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
