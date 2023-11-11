import {render, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import TaskList from '../features/components/TaskLists/TaskList'
import {RecoilRoot} from 'recoil'
import '@testing-library/jest-dom'

describe('TaskList Component', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <TaskList />
      </RecoilRoot>
    )
  })

  test('Add Task Modal can be opend and closed', async () => {
    await user.click(screen.getByTestId('add-task-button'))
    await waitFor(() => {
      expect(screen.getByTestId('task-modal')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('close-modal-button'))
    await waitFor(() => {
      expect(screen.queryByTestId('task-modal')).not.toBeInTheDocument()
    })
  })

  test('Filter Task Menu can be opened and closed', async () => {
    await user.click(screen.getByTestId('filter-task-button'))
    await waitFor(() => {
      expect(screen.getByTestId('task-filter')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('close-modal-button'))
    await waitFor(() => {
      expect(screen.queryByTestId('task-filter')).not.toBeInTheDocument()
    })
  })
//   KodeLanjutan
})