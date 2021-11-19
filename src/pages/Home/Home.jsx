import { Suspense } from 'react';
import Todolist from 'components/Todolist/Todolist';
import Search from 'components/Search/Search';
function Home() {
  return (
    <div>
      <h3>home</h3>
      <div style={{ display: 'flex', gap: 100 }}>
        <div>
          <Suspense fallback={<div>loading...</div>}>
            <Todolist />
          </Suspense>
        </div>
        <div>
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Home;
