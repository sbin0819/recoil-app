import { atom, selector } from 'recoil';

export const todoListAtom = atom({
  key: 'todoListAtom',
  default: [
    { id: 'abc', text: 'recoil 배우기' },
    { id: 'bbb', text: '영상 찍기' },
  ],
});

export const textAtom = atom({
  key: 'textAtom',
  default: '',
});
