import { atom, selector } from 'recoil';
import axios from 'axios';

export const textAtom = atom({
  key: 'textAtom',
  default: '',
});

export const todoListSelector = selector({
  key: 'todoListSelector',
  get: async () => {
    const response = await axios.get('http://localhost:8888/todos');
    if (response.error) {
      throw response.error;
    }
    return response.data;
  },
});

export const todoListAtom = atom({
  key: 'todoListAtom',
  default: todoListSelector,
});
