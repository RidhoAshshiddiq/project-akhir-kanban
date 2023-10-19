import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import SideMenu from './components/SideMenu';

const Home: React.FC = () => <h1>Home</h1>;
const TaskList: React.FC = () => <h1>Task List</h1>;
const TaskProgress: React.FC = () => <h1>Task Progress</h1>;

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <SideMenu />
        <div style={{ marginLeft: '-20px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="task-list" element={<TaskList />} />
            <Route path="task-progress" element={<TaskProgress />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
