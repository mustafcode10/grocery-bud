import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
// local storage
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  }else {
    return []
  }
};

function App() {
  // // before local storage  const [list, setList] = useState([]);
  // local storage passed function getLocalSotrage
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handle submit");
    if (!name) {
      // display alert or there is no post and value false
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      // deal with editing
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          setName("");
          setIsEditing(false);
          setEditID(null);
          showAlert(true, "success", "value edited");
          return item;
        })
      );
    } else {
      // create post and show alert.
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  // show alert
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  // clear Items list
  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  // removed item from list
  const removedItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };
  // edit item
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  // use effect to call localStorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <h3>Grocery Bud</h3>
      {alert.show && <Alert {...alert} removedAlert={showAlert} list={list} />}
      <form className="grocery-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            className="grocery"
            placeholder="e.g eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List  items={list} removedItem={removedItem} editItem={editItem} />
          <button className="clear-btn " onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
