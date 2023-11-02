import { useRecoilState} from 'recoil';
import { tasksState} from '../tasks/TaskAtoms';
import type { Task } from '../../types';
import { TASK_PROGRESS_ID } from '../../constants/app';

interface useTaskActionType {
  completeTask: (taskId: number) => void;
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void;
  // Ditambahkan
  addTask: (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void;
  // Ditambahkan
  editTask: (
    taskId: number,
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ) => void;
  deleteTask: (taskId: number) => void; // Tambahkan definisi deleteTask
}

export const useTasksAction = (): useTaskActionType => {
  const [tasks, setTasks] = useRecoilState<Task[]>(tasksState);

  const completeTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: TASK_PROGRESS_ID.COMPLETED } : task
    );
    setTasks(updatedTasks);

  };

  const moveTaskCard = (taskId: number, directionNumber: 1 | -1): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId ? { ...task, progressOrder: task.progressOrder+directionNumber } : task
    );
    setTasks(updatedTasks);
  };

  // Ditambahkan
  const addTask = (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number,
  ): void => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      detail,
      dueDate,
      progressOrder,
    }
    setTasks([...tasks, newTask])
  }

  const editTask = (
    taskId: number,
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number
  ): void => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId
        ? { ...task, title: newTitle, detail: newDetail, dueDate: newDueDate, progressOrder: newProgressOrder }
        : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: number): void => {
    const updatedTasks: Task[] = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  

 
  return {
    completeTask,
    moveTaskCard,
    addTask, // Ditambahkan
    editTask, //Ditambahkan
    deleteTask, //Ditambahkan
  };
};
