import "./App.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/DashBoard";
import PrivateRoute from "./Components/PrivateRoute";
import Signup from "./Components/Signup";
import AddUserForm from "./Components/AddUserForm";
import EditUserForm from "./Components/EditUserForm";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adduser" element={<AddUserForm />} />
            <Route path="/edit-user/:id" element={<EditUserForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
