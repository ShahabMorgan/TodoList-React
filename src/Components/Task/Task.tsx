import React, {useContext, useEffect, useState} from "react";
import {TodoListApp} from "../Main/Main";
import Button from "../Buttons/Buttons";

interface Task {
  completed: Boolean;
  id: React.Key;
  title: String;
  userId: Number;
}
interface EditedTask {
  id: Number | React.Key;
  title: String;
}

export default function TaskList() {
  const {tasks, setTask}: any = useContext(TodoListApp);
  const [edite, setEdite] = useState(false);
  const [editedTask, setEditedTask] = useState<EditedTask>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        const data = await resp.json();

        setTask([...data]);
        localStorage.setItem("tasks", JSON.stringify([...data]));
      } catch (err) {
        console.log(err);
      }
    };
    tasks.length < 1 && fetchData();
  }, []);

  const editeTask = () => {
    const updatedTasks = tasks.map((v: any) => {
      console.log(editedTask?.id);
      if (v.id === editedTask?.id) {
        v.title = editedTask?.title;
      }
      return v;
    });
    setTask([...updatedTasks]);
    localStorage.setItem("tasks", JSON.stringify([...updatedTasks]));
    setEdite(false);
  };

  const handleInput = (e: any) => {
    setEditedTask({
      title: e.target?.value,
      id: editedTask?.id,
    });
  };

  const setActive = (elment: any) => {
    elment.currentTarget.classList.toggle("bg-input");
  };

  const deleteTask = (elment: any) => {
    const newTasks = tasks.filter((task: Task) => task.id !== elment.id);
    setTask(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const TaskList = tasks.map((v: Task) => (
    <div className="w-full">
      <div className="flex w-full gap-5" key={v.id}>
        <div
          className="self-center h-3 p-3 border cursor-pointer text-input border-input rounded-checkBox hover:text-input"
          onClick={(elment) => {
            setActive(elment);
            console.log("check");
            setActive(elment);
          }}
        ></div>
        <div className="flex-1 ">{v.title}</div>

        <div className="flex self-center gap-2">
          <div
            className="cursor-pointer hover:text-input"
            onClick={(e) => {
              setEditedTask({title: v?.title, id: v?.id});
              setEdite(true);
            }}
          >
            Edite
          </div>
          <div
            className="cursor-pointer hover:text-input"
            onClick={() => {
              deleteTask(v);
            }}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col items-center gap-5 overflow-auto h-72">
      {edite && (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-5 bg-modal">
          <textarea
            className="border outlqine-none h-52 w-96 placeholder-input text-input p-input border-input rounded-input "
            value={editedTask?.title}
            onChange={(e) => {
              handleInput(e);
            }}
          ></textarea>
          <div className="flex gap-5">
            <Button
              action={() => {
                editeTask();
              }}
            >
              Submit
            </Button>

            <Button
              action={() => {
                setEdite(false);
              }}
            >
              Cancle
            </Button>
          </div>
        </div>
      )}
      {TaskList}
    </div>
  );
}
