import { atom, selector, selectorFamily } from 'recoil';
import axios from 'axios';

export const todoListAtom = atom({
  key: 'todoListAtom',
  default: [],
});

export const textAtom = atom({
  key: 'textAtom',
  default: '',
});

export const todoListSelectorFamily = selectorFamily({
  key: 'todoListSelectorFamily',
  get: () => async () => {
    try {
      const response = await axios.get('http://localhost:8888/todos');
      return response.data;
    } catch (err) {
      throw err;
    }
  },
});

export const todoListSelector = selector({
  key: 'todoListSelector',
  get: ({ get }) => get(todoListSelectorFamily()),
  set: ({ set }, newValue) => set(todoListAtom, newValue),
});

export const testAtom = atom({
  key: 'testAtom',
  default: 10,
});

export const testSelector = selector({
  key: 'testSelector',
  get: ({ get }) => get(testAtom),
  set: ({ set }, newValue) => set(testAtom, newValue),
});
