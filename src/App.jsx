import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    password: '',
    confirmPassword: '',
    contact: ''
  });

  const [updateData, setUpdateData] = useState({
    rollNo: '',
    newContact: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { firstName, lastName, rollNo, password, confirmPassword, contact } = form;

    if (!firstName || !lastName || !rollNo || !password || !confirmPassword || !contact) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check for duplicate Roll No
    const exists = students.some(s => s.rollNo === rollNo);
    if (exists) {
      alert("Student with this Roll No already exists");
      return;
    }

    setStudents([...students, { firstName, lastName, rollNo, contact }]);
    setForm({ firstName: '', lastName: '', rollNo: '', password: '', confirmPassword: '', contact: '' });
  };

  const handleDelete = (rollNo) => {
    const updated = students.filter(student => student.rollNo !== rollNo);
    setStudents(updated);
  };

  const handleUpdate = () => {
    const index = students.findIndex(s => s.rollNo === updateData.rollNo);
    if (index === -1) {
      alert("Roll No not found");
      return;
    }

    const updatedStudents = [...students];
    updatedStudents[index].contact = updateData.newContact;
    setStudents(updatedStudents);
    setUpdateData({ rollNo: '', newContact: '' });
  };

  return (
    <div className="container">
      <h2>Student Registration</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <input type="text" name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>

      <h3>Update Contact</h3>
      <input type="text" placeholder="Roll No" value={updateData.rollNo} onChange={e => setUpdateData({ ...updateData, rollNo: e.target.value })} />
      <input type="text" placeholder="New Contact" value={updateData.newContact} onChange={e => setUpdateData({ ...updateData, newContact: e.target.value })} />
      <button onClick={handleUpdate}>Update Contact</button>

      <h3>Student Records</h3>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Full Name</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="4">No students registered</td></tr>
          ) : (
            students.map((student) => (
              <tr key={student.rollNo}>
                <td>{student.rollNo}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.contact}</td>
                <td><button onClick={() => handleDelete(student.rollNo)}>Delete</button></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
