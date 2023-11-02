import { useState } from 'react' // useState ditambahkan
import { useRecoilValue } from 'recoil'
import { tasksState } from '../../tasks/TaskAtoms'
import TaskListItem from './TaskListItem'
import type { Task, CSSProperties } from '../../../types'
import TaskModal from '../../components/shared/TaskModal' //Ditambahkan
import { TASK_PROGRESS_ID, TASK_MODAL_TYPE} from '../../../constants/app' // Ditambahkan
import { useTasksAction } from '../../hooks/Tasks'; // Ditambahkan

const TaskList = (): JSX.Element => {
  const tasks: Task[] = useRecoilValue(tasksState)
  const { editTask } = useTasksAction(); // Ditambahkan
  
  // Ditambahkan
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false) 


  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Tasks</h1>
      <div style={styles.taskButtons}>
        <button
          style={styles.button}
          onClick={(): void => {
            setIsModalOpen(true) // Ditambahkan
          }}
        >
          <span className="material-icons">add</span>Add task
        </button>
        <button style={styles.button}>
          <span className="material-icons">sort</span>Filter tasks
        </button>
      </div>
      <div>
        <div style={styles.tableHead}>
          <div style={styles.tableHeaderTaskName}>Task Name</div>
          <div style={styles.tableHeaderDetail}>Detail</div>
          <div style={styles.tableHeaderDueDate}>Due Date</div>
          <div style={styles.tableHeaderProgress}>Progress</div>
        </div>
        {tasks.map((task: Task) => {
          return <TaskListItem task={task} key={task.id} />
        })}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Add your task"
          type={TASK_MODAL_TYPE.ADD}
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={TASK_PROGRESS_ID.NOT_STARTED}
          editTask={(newTitle, newDetail, newDueDate, newProgressOrder) => {
          // Di sini, Anda dapat mengganti taskId dengan cara mengidentifikasi task secara langsung
          // Misalnya, dengan mencari task berdasarkan newTitle atau parameter lainnya.
          const taskToEdit = tasks.find((task) => task.title === newTitle);
          if (taskToEdit) {
        editTask(taskToEdit.id, newTitle, newDetail, newDueDate, newProgressOrder);
      }
    }}
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