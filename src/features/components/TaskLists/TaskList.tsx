import { useState } from 'react' 
import { useRecoilValue } from 'recoil'
import { tasksState } from '../../tasks/TaskAtoms'
import TaskListItem from './TaskListItem'
import type { Task, CSSProperties } from '../../../types'
import TaskModal from '../shared/TaskModal' 
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE} from '../../../constants/app' 
import { useTasksAction } from '../../hooks/Tasks'; 
import TaskFilter from '../shared/TaskFilter'; // Import TaskFilter
import type { TaskModalType } from '../../../constants/app';


const TaskList = (): JSX.Element => {
  const tasks: Task[] = useRecoilValue(tasksState)
  const { addTask, editTask } = useTasksAction(); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('all'); // Tambahkan state untuk filter
  const [modalType, setModalType] = useState<string>(TASK_MODAL_TYPE.ADD);
 
  
  const addTaskHandler = (
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number
  ): void => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: newTitle,
      detail: newDetail,
      dueDate: newDueDate,
      progressOrder: newProgressOrder,
    };

    const updatedTasks = [...tasks, newTask];
    console.log('Updated Tasks:', updatedTasks);
    console.log(addTask);
    

    // Setelah penambahan tugas baru, atur filterType ke 'all'
    setFilterType('all');

    addTask(newTitle, newDetail, newDueDate, newProgressOrder);
  };

  const applyFilterHandler = (selectedFilter: string): void => {
    console.log('Applying Filter...', selectedFilter);
    setFilterType(selectedFilter);
    setIsModalOpen(false); // Tutup modal setelah menerapkan filter
  };
  
  const editTaskHandler = (
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number,
  ): void => {
    const updatedTasks = tasks.map((task) => ({
      ...task,
      title: newTitle,
      detail: newDetail,
      dueDate: newDueDate,
      progressOrder: newProgressOrder,
    }));
    console.log('Updated Tasks:', updatedTasks);
    console.log(editTask)
  };
  

  console.log('Render TaskList');

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Tasks</h1>
      <div style={styles.taskButtons}>
        <button
          style={styles.button}
          onClick={(): void => {
            setIsModalOpen(true);
            setModalType(TASK_MODAL_TYPE.ADD);
          }}
          data-testid="add-task-button" // Ditambahkan
        >
          <span className="material-icons">add</span>Add Task
        </button>
        <button
          style={styles.button}
          onClick={(): void => {
            setIsModalOpen(true);
            setModalType(TASK_MODAL_TYPE.FILTER);
          }}
          data-testid="filter-task-button" // Ditambahkan
        >
          <span className="material-icons">sort</span>Filter Task
        </button>
        {isModalOpen && ( // Render TaskFilter only when isModalOpen is true
          <TaskFilter filterType={filterType} setFilterType={setFilterType} applyFilter={(selectedFilter) => applyFilterHandler(selectedFilter)} />
        )}

      </div>
      <div>
        <div style={styles.tableHead}>
          <div style={styles.tableHeaderTaskName}>Task Name</div>
          <div style={styles.tableHeaderDetail}>Detail</div>
          <div style={styles.tableHeaderDueDate}>Due Date</div>
          <div style={styles.tableHeaderProgress}>Progress</div>
        </div>
        {tasks
        .filter((task) => {
        if (filterType === 'completed') {
          return task.progressOrder === TASK_PROGRESS_ID.COMPLETED;
        } else if (filterType === 'uncompleted') {
          return task.progressOrder !== TASK_PROGRESS_ID.COMPLETED;
        }
        return true;
      })
      .map((task) => {
        return <TaskListItem task={task} key={task.id} />;
      })}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle={modalType === TASK_MODAL_TYPE.FILTER ? 'Filter tasks' : 'Add your task'}
          type={modalType as TaskModalType}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
          applyFilter={applyFilterHandler} //Ditambahkan
          modalType={modalType as TaskModalType}
          onSubmit={addTaskHandler}
          editTask={editTaskHandler}
        />
      )}
    </div>
  )
}

const styles: CSSProperties = {
  container: {
    padding: '20px',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '20px',
  },
  taskButtons: {
    display: 'flex',
    marginBottom: '30px',
    position: 'relative',
  },
  button: {
    padding: '16px',
    fontSize: '16px',
    marginRight: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  tableHead: {
    display: 'flex',
    fontSize: '24px',
    borderBottom: '1px solid #D8D8D8',
    marginTop: '-20px'
  },
  tableHeaderTaskName: {
    padding: '16px',
    width: '25%',
    textAlign: 'center',
  },
  tableHeaderDetail: {
    padding: '16px',
    width: '30%',
    textAlign: 'center',
  },
  tableHeaderDueDate: {
    padding: '16px',
    width: '10%',
    marginLeft: '60px',
    textAlign: 'center',
  },
  tableHeaderProgress: {
    padding: '16px',
    width: '15%',
    marginLeft: '35px',
    textAlign: 'center'
    
  },
}

export default TaskList