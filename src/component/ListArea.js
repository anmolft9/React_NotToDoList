import React from "react";
import { Col, Row } from "react-bootstrap";
import { TaskList } from "./TaskList";

export const ListArea = ({ taskList, switchTask, total }) => {
  //only the entry list item
  //   console.log(taskList);

  const entryList = taskList.filter(({ type }) => type === "entry");
  const badList = taskList.filter(({ type }) => type === "bad");

  const badHrs = badList.reduce((acc, item) => acc + +item.hr, 0);

  //   console.log(entryList, taskList);

  return (
    <div className="list-area">
      <Row>
        <Col>
          <TaskList
            title="entryList"
            arrow="right"
            list={entryList}
            switchTask={switchTask}
          />
        </Col>
        <Col>
          <TaskList title="badList" list={badList} switchTask={switchTask} />
          <div className="text-end">Total time: {total} hrs</div>
          <div className="">you could have saved {badHrs} hrs</div>
        </Col>
      </Row>
    </div>
  );
};
