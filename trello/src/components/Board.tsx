import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { ITodo } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

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
interface IAreaProps {
  isDraggingOver: boolean;
  isdraggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isdraggingFromThis
        ? "#b2bec3"
        : "transparent"};
  flex-grow: 1;
`;

interface IBoradProps {
  toDos: ITodo[];
  boardId: string;
}

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
interface IForm {
  todo: string;
}
function Board({ toDos, boardId }: IBoradProps) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
  };
  const setToDos = useSetRecoilState(toDoState);

  const onValid = (todo: IForm) => {
    const newTodo: ITodo = {
      id: Date.now(), // 고유한 ID 생성
      text: todo.todo,
    };
    setToDos((prevState) => ({
      ...prevState,
      [boardId]: [...prevState[boardId], newTodo], // ✅ 올바르게 boardId 접근
    }));
    setValue("todo", ""); // 입력 필드 초기화
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
        <button onClick={onClick}>Click me</button>
      </Form>

      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isdraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                todoText={toDo.text}
                todoId={toDo.id}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
