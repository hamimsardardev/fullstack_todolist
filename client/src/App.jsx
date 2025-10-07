import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [showeditmodal, setshowEditModal] = useState(false);
  const [id, setId] = useState(null);
  const [updatename, setUpdateName] = useState("");
  const [updateage, setUpdateage] = useState("");

  // Add Todo
  const handleAdd = () => {
    if (name.trim() && age.trim()) {
      axios
        .post("http://localhost:3000/addtodo", { name, age })
        .then((res) => {
          console.log(res);
          setName("");
          setAge("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please enter both Name and Age!");
    }
  };

  // Delete Todo
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deletetask/${id}`)
      .then((res) => {
        alert("Deleted Succesfull");
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Get All Todos
  function getAlltask() {
    axios
      .get("http://localhost:3000/getalltodo")
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAlltask();
  }, [todos]);

  // Open Edit Modal
  const handleEditModal = (id) => {
    setId(id);
    setshowEditModal(true);
  };

  // Save Edited Todo
  const handleSave = () => {
    axios
      .patch(`http://localhost:3000/edittask/${id}`, {
        name: updatename,
        age: updateage,
      })
      .then((res) => {
        console.log(res);        
        setshowEditModal(false);      
        setUpdateName("");
        setUpdateage("");        
        getAlltask();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          📝 Todo List
        </h2>

        {/* Input Fields */}
        <div className="flex flex-col gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-2 transition"
          >
            Add Todo
          </button>
        </div>

        {/* Todo List */}
        <div>
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center">No todos yet</p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex justify-between items-center border border-gray-200 rounded-lg p-3 bg-gray-50"
                >
                  <div>
                    <p className="text-gray-800 font-medium">
                      {todo.name.toUpperCase()}
                    </p>
                    <p className="text-gray-500 text-sm">Age: {todo.age}</p>
                  </div>

                  <div className="flex flex-column gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditModal(todo._id)}
                      className="text-white hover:text-blue-700 hover:bg-yellow-300 px-3 py-2 bg-teal-500 rounded-[10px] font-medium"
                    >
                      Edit
                    </button>

                    {/* Edit Modal */}
                    {showeditmodal && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
                          <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Edit Todo
                          </h2>

                          <input
                            name="name"
                            type="text"
                            placeholder="Update Name"
                            onChange={(e) => setUpdateName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                          <input
                            name="text"
                            type="text"
                            placeholder="Update Age"
                            onChange={(e) => setUpdateage(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />

                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setshowEditModal(false)}
                              className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleSave}
                              className="bg-teal-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Delete Button */}
                    {console.log(todo)}
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-white bg-red-500 px-3 py-2 hover:text-red-700 hover:bg-black rounded-[10px] font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
