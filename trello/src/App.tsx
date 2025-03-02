import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;


const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export function App(){
  const [toDos, setToDos]=useRecoilState(toDoState);
  
  const dragEnd=(info:DropResult)=>{
    if(!info.destination)
      return;
    console.log(info);
    const {destination, draggableId, source}=info;
    
    /*setToDos((oldToDos)=>{
      const copyToDos=[...oldToDos];
      const sourceToDo=copyToDos.splice(source.index,1);
      copyToDos.splice(destination.index, 0, ...sourceToDo)
      return copyToDos
    })*/
  };

  return (
  <DragDropContext onDragEnd={dragEnd}>
    <Wrapper>
      <Boards>
        {Object.keys(toDos).map(boardId=>
          <Board key={boardId} toDos={toDos[boardId]} boardId={boardId}/>
        )}  
      </Boards>
    </Wrapper>
  </DragDropContext>)
}