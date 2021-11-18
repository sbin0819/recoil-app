import { atom, selector } from 'recoil';
import axios from 'axios';

export const todoListAtom = atom({
  key: 'todoListAtom',
  default: null,
});

export const todoListSelector = selector({
  key: 'todoListSelector',
  get: async ({ get }) => {
    try {
      const todoListState = get(todoListAtom);
      if (todoListState !== null) {
        return todoListState;
      }
      const { data } = await axios.get('http://localhost:8888/todos');
      return data;
    } catch (err) {
      throw err;
    }
  },
  set: ({ set }, newValue) => set(todoListAtom, newValue),
});

export const textAtom = atom({
  key: 'textAtom',
  default: '',
});
