import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Container, ContainerTitle } from "./Container";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface TaskInterface {
  id: number;
  name: string;
  isCompleted: boolean;
}

interface TaskItemProps {
  id: number;
  isCompleted: boolean;
  name: string;
}

let globalTasks: TaskInterface[] = [];
if (localStorage.getItem("tasks")) {
  globalTasks = JSON.parse(localStorage.getItem("tasks")!);
}

function TaskItem({ isCompleted, name, id }: TaskItemProps) {
  const [checkedItem, setCheckedItem] = useState<boolean>(isCompleted);
  const [localTask, setLocalTask] = useState<TaskInterface>({
    id,
    name,
    isCompleted: checkedItem,
  });
  const [openedDialog, setOpenedDialog] = useState<boolean>(false);

  useEffect(() => {
    globalTasks[globalTasks.findIndex((task) => task.id === localTask.id)] =
      localTask;
    localStorage.setItem("tasks", JSON.stringify(globalTasks));
  }, [localTask]);

  useEffect(() => {
    setLocalTask((state) => ({
      id: state.id,
      isCompleted: checkedItem,
      name: state.name,
    }));
  }, [checkedItem]);

  return (
    <li className="flex gap-2 items-center relative hover:bg-gray-500 rounded-md px-2 transition-colors duration-200 py-1">
      <span
        onClick={() => setCheckedItem((state) => !state)}
        className="absolute size-2 bg-white rounded top-3 left-3 z-20"
      ></span>
      <input
        className="bg-gray-400 checked:bg-blue-600 min-w-4 min-h-4 appearance-none rounded-lg transition-colors duration-150 z-10"
        type="checkbox"
        checked={checkedItem}
        onChange={() => setCheckedItem((state) => !state)}
      />
      <Dialog open={openedDialog} onOpenChange={setOpenedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task ID: {id}</DialogTitle>
          </DialogHeader>
          <hr className="border-gray-600" />
          <DialogDescription className="text-gray-300">
            Tarefa: {name}
          </DialogDescription>
          <hr className="border-gray-600" />
          <DialogFooter>
            <Button
              onClick={() => {
                setOpenedDialog(false);
              }}
              variant={"default"}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                globalTasks = globalTasks.filter(
                  (task) => task.id !== localTask.id
                );
                localStorage.setItem("tasks", JSON.stringify(globalTasks));
                location.reload();
              }}
              variant={"destructive"}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <span
        onClick={() => {
          setOpenedDialog(true);
        }}
        className="w-full select-none overflow-hidden text-nowrap text-ellipsis text-md font-medium text-gray-200 flex justify-between items-center"
      >
        {name}
      </span>
    </li>
  );
}

export default function TimerSection({ className }: { className?: string }) {
  const [tasks] = useState<TaskInterface[]>(globalTasks);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  useEffect(() => {
    globalTasks = tasks;
    localStorage.setItem("tasks", JSON.stringify(globalTasks));
  }, [tasks]);

  return (
    <Container
      className={`w-full lg:w-2/5 overflow-x-auto ${
        className ? className : ""
      }`}
    >
      <ContainerTitle>Tasks</ContainerTitle>
      <ul id="task-list" className="w-full h-full py-2 px-2 overflow-y-auto">
        <li
          onClick={() => {
            setDialogOpened(true);
          }}
          className="flex gap-2 items-center cursor-pointer hover:bg-gray-500 rounded-md px-2 transition-colors duration-200 py-1"
        >
          <FaPlus color="rgb(229 231 235)" />
          <span className="text-md font-medium text-gray-200">
            Add new task.
          </span>
        </li>
        <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
          <DialogContent>
            <DialogHeader className="flex flex-col space-y-2">
              <DialogTitle>Add a new task:</DialogTitle>
              <hr className="bg-gray-300" />
              <Label className="min-w-max" htmlFor="task-name">
                Task Name:
              </Label>
              <Input
                id="task-name"
                className="border border-gray-300 text-white placeholder:text-gray-400"
                type="text"
                placeholder="Ex.: Study Mathematics."
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter") {
                    if (newTaskName) {
                      tasks.push({
                        id:
                          tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
                        isCompleted: false,
                        name: newTaskName,
                      });
                      setNewTaskName("");
                      setDialogOpened(false);
                    }
                  }
                }}
              />
              <Button
                className="font-semibold text-md"
                onClick={() => {
                  if (newTaskName) {
                    tasks.push({
                      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
                      isCompleted: false,
                      name: newTaskName,
                    });
                    setNewTaskName("");
                    setDialogOpened(false);
                  }
                }}
              >
                Add Task
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {tasks.length
          ? tasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                name={task.name}
                isCompleted={task.isCompleted}
              />
            ))
          : ""}
      </ul>
    </Container>
  );
}
