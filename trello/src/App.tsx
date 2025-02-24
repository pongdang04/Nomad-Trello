import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
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
const [toDos, setToDos]=useRecoilState(toDoState);

export function App(){
  const dragEnd=({destination, source}:DropResult)=>{
    if(!destination)
      return;

    setToDos((oldToDos)=>{
      const copyToDos=[...oldToDos];
      const sourceToDo=copyToDos.splice(source.index,1);
      copyToDos.splice(destination.index, 0, ...sourceToDo)
      return copyToDos
    })
  };

  return (<DragDropContext onDragEnd={dragEnd}>
    <Wrapper>
      <Boards>
        <Droppable droppableId="one">
          {(droppableMagic)=>(
          <Board ref={droppableMagic.innerRef} {...droppableMagic.droppableProps}>
            {toDos.map((element,index)=>
              <Draggable key={index} draggableId={element} index={index}>
                {(draggableMagic1)=>
                  <Card ref={draggableMagic1.innerRef}{...draggableMagic1.draggableProps}{...draggableMagic1.dragHandleProps}>
                    {element}
                  </Card>} 
              </Draggable>
            )}
            {droppableMagic.placeholder}
          </Board>)} 
        </Droppable>  
      </Boards>
    </Wrapper>
  </DragDropContext>)
}