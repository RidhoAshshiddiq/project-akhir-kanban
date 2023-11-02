import React from 'react';
import type { Task, CSSProperties } from '../../../types';
import { TASK_PROGRESS_ID } from '../../../constants/app';
import { useState } from 'react'; // useState ditambahkan
import TaskMenu from '../../components/shared/TaskMenu'; // Ditambahkan
import { useTasksAction } from '../../hooks/Tasks';
import TaskModal from '../../components/shared/TaskModal'; //Ditambahkan
import { TASK_MODAL_TYPE } from '../../../constants/app'; //Ditambahkan

interface TaskCardProps {
  task: Task;
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void;
  completeTask: (taskId: number) => void;
  
}

const TaskCard = ({ task, moveTaskCard, completeTask }: TaskCardProps): JSX.Element => {
  const getIconStyle = (progressOrder: number): React.CSSProperties => {
    const color: '#55C89F' | '#C5C5C5' =
      progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5';

    const cursor: 'default' | 'pointer' =
      progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer';

    return {
      color,
      cursor,
      fontSize: '28px',
    };
  };

  const getArrowPositionStyle = (progressOrder: number): React.CSSProperties => {
    const justifyContentValue: 'flex-end' | 'space-between' =
      progressOrder === TASK_PROGRESS_ID.NOT_STARTED ? 'flex-end' : 'space-between';
    return {
      display: 'flex',
      justifyContent: justifyContentValue,
    };
  };

  // Ditambahkan

  const {editTask} = useTasksAction();
  const {deleteTask} = useTasksAction();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);



  const handleCompleteTask = (): void => {
    if (!isMenuOpen) {
      completeTask(task.id);
    }
  }

  const handleEditTask = (
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number
  ): void => {
    if (task.id) {
      editTask(task.id, newTitle, newDetail, newDueDate, newProgressOrder);
      setIsMenuOpen(false);
      setIsEditFormOpen(false);
    }
  };

  const handleDeleteTask = (): void => {
    // Lakukan operasi sebelum menghapus jika diperlukan
    deleteTask(task.id);
    setIsMenuOpen(false); // Tutup menu setelah penghapusan
  };
  

  return (
    <div style={styles.taskCard}>
      <div style={styles.taskIcons}>
        <div
          className="material-icons"
          style={getIconStyle(task.progressOrder)}
          onClick={handleCompleteTask}
        >
          check_circle
        </div>
        <div 
          className="material-icons"
          style={styles.menuIcon}
          onClick={(): void => {
          setIsMenuOpen(true) // Ditambahkan
          }}
          >
          more_vert
        </div>
      </div>
      <p style={styles.taskTitle}>{task.title}</p>
      <div>
        <p>{task.detail}</p>
      </div>
      <div>
        <p>Due on {task.dueDate}</p>
      </div>
      <div style={getArrowPositionStyle(task.progressOrder)}>
        {task.progressOrder !== TASK_PROGRESS_ID.NOT_STARTED && (
          <button className="material-icons" onClick={() => moveTaskCard(task.id, -1)}>
            chevron_left
          </button>
        )}
        {task.progressOrder !== TASK_PROGRESS_ID.COMPLETED && (
          <button className="material-icons" onClick={() => moveTaskCard(task.id, 1)}>
            chevron_right
          </button>
        )}
      </div>
      {/* Ditambahkan */}
      {isMenuOpen && (
        // <TaskMenu setIsMenuOpen={setIsMenuOpen} task={task} />
        <TaskMenu
          setIsMenuOpen={setIsMenuOpen}
          task={task}
          initialTitle={task.title}
          initialDetail={task.detail}
          initialDueDate={task.dueDate}
          initialProgressOrder={task.progressOrder}
          editTask={handleEditTask}
          deleteTask={handleDeleteTask} // Tambahkan ini
          openEditForm={() => setIsEditFormOpen(true)} // Tambahkan ini untuk membuka form edit
        />
      )}
      {isEditFormOpen && (
        <TaskModal
          headingTitle="Edit your task"
          type={TASK_MODAL_TYPE.EDIT} // Ubah menjadi modal edit
          setIsModalOpen={setIsEditFormOpen}
          defaultProgressOrder={task.progressOrder}
          task={task}
          editTask={handleEditTask}
        />
      )}
    </div>
  );
};

const styles: CSSProperties = {
  taskCard: {
    backgroundColor: '#C7EFD0',
    borderRadius: '12px',
    padding: '24px',
    margin: '12px 0',
    fontSize: '20px',
    overflowWrap: 'anywhere',
    position: 'relative',
  },
  taskIcons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuIcon: {
    cursor: 'pointer',
  },
  taskTitle: {
    fontSize: '30px',
  },
  arrowsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}

export default TaskCard


