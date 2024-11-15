import React, {createContext, useState} from "react";
import Input from "../Input/Input";
import Button from "../Buttons/Buttons";
import Form from "../Form/Form";
import TaskList from "../Task/Task";

export const TodoListApp = createContext();

interface Task {
  descrption: String;
  date: any;
  compleate: Boolean;
}

export default function Main() {
  const [modal, setModal] = useState(false);
  const [tasks, setTask] = useState<Task>(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const openModal = () => {
    setModal(true);
  };

  return (
    <TodoListApp.Provider value={{modal, setModal, tasks, setTask}}>
      <div className="flex flex-col gap-5">
        <div className="flex justify-center gap-5">
          <Form />
          <Button action={openModal}>Add Task</Button>
        </div>
        <TaskList />
      </div>
    </TodoListApp.Provider>
  );
}
