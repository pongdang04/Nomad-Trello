import { atom } from "recoil";

interface ITodoState{
  [key:string]:string[]
}

export const toDoState=atom<ITodoState>({
  key:"toDo",
  default:{
    "To do":["a", "b" ],
    "Doing":[ "c", "d"],
    "done":["e", "f"]
  }
});