import React, { useState } from "react";
import { Button, Radio } from "antd";
import "./Todo.css";
function Todo(props) {
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.content);
  function handleEditUpdate() {
    setEdit(false);
    props.handleEditUpdate(props.id, editValue);
  }
  return (
    <div className="container2">
      <div>
        <Radio
          className="radio"
          type="radio"
          checked={props.checked}
          onChange={(e) => {
            props.handleRadioChange(props.id, e.target.checked);
          }}
        ></Radio>
      </div>
      {!edit ? (
        <div
          style={{
            width: "200px",
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {props.content}
        </div>
      ) : (
        <input
          style={{ height: "30px", width: "200px" }}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditUpdate}
        ></input>
      )}

      <div>
        <Button
          type="primary"
          style={{ marginLeft: "10px", marginRight: "10px" }}
          onClick={() => setEdit(true)}
        >
          edit
        </Button>
        <Button
          style={{ marginLeft: "10px", marginRight: "10px" }}
          type="primary"
          onClick={() => props.handleDeleteTodo(props.id)}
        >
          delete
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Todo);
