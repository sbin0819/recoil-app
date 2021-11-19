import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { todoListSelector } from 'store';

function Search() {
  const [text, setText] = useState('');
  const todoList = useRecoilValue(todoListSelector);
  const [searchList, setSearchList] = useState([]);
  const onChange = useCallback(
    (e) => {
      const { value } = e.target;
      setText(value);
    },
    [text],
  );

  const searchHandler = useCallback(() => {
    const lists = todoList.filter((e) =>
      text === '' ? false : e.text.includes(text),
    );
    setSearchList(lists);
  }, [text]);

  useEffect(() => {
    searchHandler();
  }, [text]);

  return (
    <div>
      <h3>Todo List</h3>
      <input type="text" value={text} onChange={onChange} />
      <ul>
        {searchList.length > 0 ? (
          searchList.map((el, i) => <li key={i}>{el.text}</li>)
        ) : (
          <p>검색결과가 없습니다.</p>
        )}
      </ul>
    </div>
  );
}

export default Search;
