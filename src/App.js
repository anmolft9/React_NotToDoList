// import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import { TaskForm } from "./component/TaskForm";
import { ListArea } from "./component/ListArea";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { fetchTasks } from "./helpers/axiosHelper";

const weeklyHr = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [ids, setIds] = useState([]);

  ///
  useEffect(() => {
    /////
    getTaskFromServer();
  }, []);

  const getTaskFromServer = async () => {
    const data = await fetchTasks();
    setTaskList(data.result);
  };

  ///////////////////////////////////////////////////////////////
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
  // console.log(taskList);

  ///handleOnCheck for checkbox
  const handleOnCheck = (e) => {
    const { checked, value } = e.target;
    // console.log(checked, value, name);

    if (value === "entry" || value === "bad") {
      let toDeleteIds = [];
      taskList.forEach((item) => {
        if (item.type === value) {
          toDeleteIds.push(item.id);
        }
      });
      //if ticked add all ids ohterwose take them out
      if (checked) {
        //add all entry list ids in entryIds
        // const entryIds = taskList.filter((item) => {
        //   if (item.type === "entry") {
        //     return item.id;
        //   }

        // console.log(entryIds, name);
        setIds([...ids, ...toDeleteIds]);
      } else {
        //remove all entry list ids
        const tempArgs = ids.filter((id) => !toDeleteIds.includes(id));
        setIds(tempArgs);
      }
      return;
    }
    if (checked) {
      //add indivdiual item id
      setIds([...ids, value]);
      // console.log(ids);
    } else {
      //removing indivdiual item id
      const removeIds = ids.filter((item) => item !== value);
      // console.log(removeIds);
      setIds(removeIds);
    }
    // console.log(ids);
  };

  const handleOnDelete = () => {
    // console.log("deleting");
    if (!window.confirm("you sure?")) {
      return;
    }
    const tempArg = taskList.filter((item) => !ids.includes(item.id));
    setTaskList(tempArg);
    setIds([]);
  };
  // console.log(ids);

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
        <ListArea
          taskList={taskList}
          switchTask={switchTask}
          total={total}
          handleOnCheck={handleOnCheck}
          ids={ids}
        />

        {/* delete button */}
        <div className="mt-2">
          {ids.length > 0 && (
            <Button
              onClick={handleOnDelete}
              //sending the name as well
              variant="danger"
            >
              Delete
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
