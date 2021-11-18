import { Suspense, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { testAtom, testSelector } from 'store';

import Todolist from 'components/Todolist/Todolist';

function Home() {
  const [t, tSet] = useRecoilState(testSelector);
  const onClick = () => tSet((prev) => prev + 10);
  return (
    <div>
      <h3>home</h3>
      <h1>{t}</h1>
      <button onClick={onClick}>클릭</button>
      <Suspense fallback={<div>loading...</div>}>
        <Todolist />
      </Suspense>
    </div>
  );
}

export default Home;
