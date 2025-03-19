import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    "To do": [{ id: 1, text: "a" }],
    Doing: [{ id: 2, text: "b" }],
    done: [{ id: 3, text: "c" }],
  },
});
