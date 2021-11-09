import { useEffect } from 'react';

import Todolist from 'components/Todolist/Todolist';
import axios from 'axios';

function Home() {
  const fetch = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    console.log(res);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <h3>home</h3>
      <Todolist />
    </div>
  );
}

export default Home;
