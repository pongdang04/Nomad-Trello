import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function App(){
  const dragEnd=()=>{};

  return <DragDropContext onDragEnd={dragEnd}>
    <div>
      <Droppable droppableId="one">
        {(droppableMagic)=>(
        <ul ref={droppableMagic.innerRef} {...droppableMagic.droppableProps}>
          <Draggable draggableId="first" index={0}>
            {(draggableMagic1)=><li ref={draggableMagic1.innerRef}
            {...draggableMagic1.draggableProps}
            ><span {...draggableMagic1.dragHandleProps}>0-0</span>
              One</li>} 
          </Draggable>
          <Draggable draggableId="second" index={1}>
            {(draggableMagic2)=><li ref={draggableMagic2.innerRef}
            {...draggableMagic2.dragHandleProps}
            {...draggableMagic2.draggableProps}
            >Two</li>}
          </Draggable>
        </ul>)}
      </Droppable>
    </div>
  </DragDropContext>
}