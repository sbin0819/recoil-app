import { useEffect, useState } from 'react';

const datas = ['안녕', '안녕하세요', '반갑습니다', '리액트', '리코일', 'aaa'];

function Search(props) {
  const [text, setText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const onChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  useEffect(() => {
    const lists = datas.filter((e) => (text === '' ? false : e.includes(text)));
    setSearchList(lists);
  }, [text]);

  return (
    <div>
      <h3>Todo List</h3>
      <input type="text" value={text} onChange={onChange} />
      <ul>
        {searchList.length > 0 ? (
          searchList.map((el, i) => <li key={i}>{el}</li>)
        ) : (
          <p>검색결과가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default Search;
