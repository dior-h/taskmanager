import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import DashLayout from './components/DashLayout';
import Welcome from './features/auth/Welcome';
import TasksList from './features/tasks/TasksList';
import UsersList from './features/users/UsersList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditTask from './features/tasks/EditTask';
import NewTask from './features/tasks/NewTask';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';

function App() {
  return (

      <Routes>
        <Route path='/' element={<Layout />}>
        {/* Public routes */}
        <Route index element={ <Public /> } />
        <Route path='login' element={ <Login />} />
        <Route path='register' element={ <Register />} />

              {/* Protected routes */}
              <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                <Route element={<Prefetch />}>

                  <Route path='dash' element={ <DashLayout />} >
                    
                    <Route index element={<TasksList />} />

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path='users'>
                        <Route index element={<UsersList />} />
                        <Route path=':id' element={<EditUser />} />
                        <Route path='new' element={<NewUserForm />} />
                      </Route>
                    </Route>

                    <Route path='tasks'>
                      <Route index element={<TasksList />} />
                      <Route path=':id' element={<EditTask />} />
                      <Route path='new' element={<NewTask />} />
                    </Route>
                  
                  </Route>
                </Route>
                </Route>
              </Route>
              {/* Protected routes */}
        </Route>
      </Routes>

  );
}

export default App;
