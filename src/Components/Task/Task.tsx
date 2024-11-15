import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {TodoListApp} from "../Main/Main";
import Button from "../Buttons/Buttons";

interface Task {
  completed: Boolean;
  id: React.Key;
  title: String;
  userId: Number;
}

export default function TaskList() {
  const {tasks, setTask}: any = useContext(TodoListApp);
  const [edite, setEdite] = useState(false);
  const [newText, setTextValue] = useState("");
  const newValue = useRef();
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

  const handleInput = (e: any) => {
    setTextValue(e.target?.value);
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
          }}
        ></div>
        <div className="flex-1 ">{v.title}</div>

        <div className="flex self-center gap-2">
          <div
            className="cursor-pointer hover:text-input"
            onClick={() => {
              newValue.current = {
                id: v?.id,
                title: v?.title,
              };
              setTextValue(v?.title);
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
            value={newText}
            onChange={(e) => {
              handleInput(e);
            }}
          ></textarea>
          <div className="flex gap-5">
            <Button
              action={() => {
                const updatedTasks = tasks.map((v: any) => {
                  const value = newValue.current;
                  if (v.id === value?.id) {
                    v.title = newText;
                  }
                  return v;
                });
                setTask([...updatedTasks]);
                localStorage.setItem(
                  "tasks",
                  JSON.stringify([...updatedTasks])
                );
                setEdite(false);
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
