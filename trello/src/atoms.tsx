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
    "To do": [],
    Doing: [],
    done: [],
  },
});
