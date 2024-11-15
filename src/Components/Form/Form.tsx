import React, {useContext, useRef, useState} from "react";
import Input from "../Input/Input";
import Button from "../Buttons/Buttons";
import {TodoListApp} from "../Main/Main";
import {createPortal} from "react-dom";

export default function Form() {
  const {modal, setModal}: any = useContext(TodoListApp);
  const {tasks, setTask}: any = useContext(TodoListApp);
  const input = useRef<HTMLElement>();

  const applyData = (title: any) => {
    const newTask = {
      id: Date.now(),
      title: title,
      date: new Date(),
      compleate: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTask(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    alert("New task added <3  ");
  };

  const closeModal = () => {
    setModal(false);
  };
  return (
    modal &&
    createPortal(
      <div className="fixed inset-0 flex items-center justify-center bg-modal text-red-50 ">
        <div className="flex flex-col justify-between p-5 text-black bg-white rounded-md w-form h-form">
          <div>
            <div>Title</div>

            <div>
              <Input ref={input}>Type your task</Input>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <Button
              action={() => {
                applyData(input.current?.value);
              }}
            >
              Aplay
            </Button>
            <Button action={closeModal}>Cancle</Button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
}
