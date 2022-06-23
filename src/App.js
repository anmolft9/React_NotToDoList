// import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import { TaskForm } from "./component/TaskForm";
import { ListArea } from "./component/ListArea";
import { useState } from "react";

const weeklyHr = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const addTask = (task) => {
    // console.log(task);
    if (total + +task.hr > weeklyHr) {
      // console.log("here");
      // return console.log("sorry");
      // return alert("sorry");
    }
    setTaskList([...taskList, task]);
    // console.log(task);
  };

  ///switch the list function
  const switchTask = (id, type) => {
    // console.log(i, type);
    const switchedArg = taskList.map((item) => {
      ///mapping the tasklist and check
      if (item.id === id) {
        item.type = type;
      }
      return item;
    });
    setTaskList(switchedArg);
  };
  console.log(taskList);

  return (
    <div className="wrapper">
      <Container>
        <div className="text-center mb-5 pt-5">
          <h1>My Not-to Do List</h1>
        </div>
        {/* form component */}
        <TaskForm addTask={addTask} />
        <hr />
        {/* list component */}
        <ListArea taskList={taskList} switchTask={switchTask} total={total} />
      </Container>
    </div>
  );
}

export default App;
