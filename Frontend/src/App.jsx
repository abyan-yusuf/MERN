import React from "react";
import { Route, Routes } from "react-router-dom";
import AllStudents from "./components/allStudents";
import AddStudent from "./components/addStudent";
import UpdateStudent from "./components/updateStudent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AllStudents />} />
      <Route path="/addStudent" element={<AddStudent />} />
      <Route path="/editStudent/:id" element={<UpdateStudent />} />
    </Routes>
  );
};

export default App;
