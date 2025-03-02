import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
import React from "react"

interface IDraggableCardProps{
  index:number,
  element: string
}
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

function DraggableCard({index, element}:IDraggableCardProps){
  return(
    <Draggable key={index} draggableId={element} index={index}>
    {(draggableMagic1)=>
      <Card ref={draggableMagic1.innerRef}{...draggableMagic1.draggableProps}{...draggableMagic1.dragHandleProps}>
        {element}
      </Card>} 
  </Draggable>
  )
}

export default React.memo(DraggableCard);