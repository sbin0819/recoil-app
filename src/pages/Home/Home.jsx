import { Suspense, useEffect } from 'react';

import Todolist from 'components/Todolist/Todolist';

function Home() {
  return (
    <div>
      <h3>home</h3>
      <Suspense fallback={<div>loading...</div>}>
        <Todolist />
      </Suspense>
    </div>
  );
}

export default Home;
