import React, { useState, useEffect, useMemo, useCallback } from "react";
import Todo from "./Todo";
import generateRdStr from "../utils/generateRdStr";
import storage from "../utils/storage";
import { Button, Input, Tabs } from "antd";
import "./List.css";
const savedValue = storage.get("todolist") ? storage.get("todolist") : [];
const { TabPane } = Tabs;
function List(props) {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [todoList, setTodoList] = useState(savedValue);
  const [current, setCurrent] = useState("all"); // three types: all finished unfinished
  const handleAddTodoList = useCallback(
    (e) => {
      if (e.keyCode === 13 && search !== "") {
        let slice = [...todoList];
        slice.push({
          content: search,
          checked: false,
          id: generateRdStr(),
        });
        setTodoList(slice);
        setSearch("");
        setValue("");
        storage.set("todolist", slice);
      }
    },
    [search, todoList]
  );
  const filteredTodoLists = useMemo(() => {
    if (current === "all") {
      return todoList.filter((item) => {
        if (item.content.search(value) === -1) return false;
        return true;
      });
    } else if (current === "finished") {
      return todoList.filter((item) => {
        if (item.content.search(value) !== -1 && item.checked) return true;
        return false;
      });
    } else {
      return todoList.filter((item) => {
        if (item.content.search(value) !== -1 && !item.checked) return true;
        return false;
      });
    }
  }, [current, value, todoList]);
  const handleDeleteTodo = useCallback(
    (id) => {
      let slice = todoList.filter((item) => item.id !== id);
      setTodoList(slice);
      storage.set("todolist", slice);
    },
    [todoList]
  );
  const handleEditUpdate = useCallback(
    (id, value) => {
      let slice = [...todoList];
      slice.forEach((item) => {
        if (item.id === id) item.content = value;
      });
      setTodoList(slice);
      storage.set("todolist", slice);
    },
    [todoList]
  );
  const handleRadioChange = useCallback(
    (id, pre) => {
      let slice = [...todoList];
      slice.forEach((item) => {
        if (item.id === id) item.checked = pre;
      });
      setTodoList(slice);
      storage.set("todolist", slice);
    },
    [todoList]
  );
  return (
    <div className="container" onKeyUp={handleAddTodoList}>
      <div>
        <div
          style={{
            marginTop: "30px",
            marginBottom: "15px",
            fontSize: "30px",
            color: "#414873",
          }}
        >
          Hello,Welcome to TodoList
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "300px" }}
            placeholder="press enter to save"
          ></Input>
          <Button type="primary" onClick={() => setValue(search)}>
            search
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "30px",
            width: "300px",
          }}
        >
          <Tabs defaultActiveKey="1" onChange={(key) => setCurrent(key)}>
            <TabPane tab="Tab 1" key="all"></TabPane>
            <TabPane tab="finished" key="finished"></TabPane>
            <TabPane tab="unfinished" key="unfinished"></TabPane>
          </Tabs>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            minHeight: "100px",
          }}
        >
          {filteredTodoLists.map((item) => {
            return (
              <Todo
                content={item.content}
                key={item.id}
                id={item.id}
                checked={item.checked}
                handleDeleteTodo={handleDeleteTodo}
                handleEditUpdate={handleEditUpdate}
                handleRadioChange={handleRadioChange}
              />
            );
          })}
          {filteredTodoLists.length === 0 ? (
            <div style={{ fontSize: "20px" }}>no todolist yet,add some!~</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default List;
