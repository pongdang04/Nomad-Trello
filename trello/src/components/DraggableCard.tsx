import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

interface IDraggableCardProps {
  index: number;
  todoText: string;
  todoId: number;
}
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
`;

function DraggableCard({ index, todoText, todoId }: IDraggableCardProps) {
  return (
    <Draggable key={index} draggableId={todoId + ""} index={index}>
      {(draggableMagic1, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={draggableMagic1.innerRef}
          {...draggableMagic1.draggableProps}
          {...draggableMagic1.dragHandleProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
