import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  padding: 10px 0px;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  width: 200px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IAreaProps{
  isDraggingOver:boolean,
  isdraggingFromThis:boolean
}
const Area=styled.div<IAreaProps>`
  background-color:${props=>props.isDraggingOver? '#dfe6e9'
  :props.isdraggingFromThis?'#b2bec3'
  :"transparent"};
  flex-grow: 1
`

interface IBoradProps{
  toDos:string[],
  boardId:string
}

function Board({toDos, boardId}:IBoradProps){
  return(
    <Wrapper>
      <Title>{boardId}</Title>
        <Droppable droppableId={boardId}>
          {(magic,snapshot) => (
            <Area isDraggingOver={snapshot.isDraggingOver} isdraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            
            ref={magic.innerRef} {...magic.droppableProps}>
              {toDos.map((toDo, index) => (
                <DraggableCard key={toDo} index={index} element={toDo} />
              ))}
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
    </Wrapper>
  )
}

export default Board;