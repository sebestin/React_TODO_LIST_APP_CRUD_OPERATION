import React from "react";
import react, { useState, useEffect } from "react";

//to get data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
 
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [togglesubmit, setTogglesubmit] = useState(true)
  const [isEditItem, setIsEditItem] = useState(null)
  // add items
  const addItem = () => {
   if (!inputData) {
        alert('plz fill data');
    } else if (inputData && !togglesubmit){
        setItems(
            items.map((elem)=>{
                if (elem.id === isEditItem)
                {
                    return{...elem,name:inputData}
                }
           return elem;
            })
        )
        setTogglesubmit (true)
        setInputData('')
        setIsEditItem(null);
     } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, allInputData]);

      setInputData("");
    }
  };
  //delete the items
  const deleteItem = (index) => {
    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
  };
  // remove all
  const removeAll = () => {
    setItems([]);
  };
  const editItem = (id) => {
      let newEditItem = items.find((elem) => {
          return elem.id ===id
      })
      console.log(newEditItem)
      setTogglesubmit (false)
      setInputData(newEditItem.name)
      setIsEditItem(id);
  };

  // add to local staorage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <figcaption>
              {" "}
              <h1><span style={{color:'blue'}}>Add </span><span style={{color:'green'}}>Your </span>  <span style={{color:'red'}}> TODO List</span> Here </h1>
            </figcaption>
          </figure>

          <div className="additems">
            <input
              type="text"
              placeholder=" Add Items "
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {
                togglesubmit ? 
                <button style={{backgroundColor:'green',color:'white'}} type="delete">
                  {" "}
                  <i
                    className="fa fa-plus add-btn"
                    title="Add Item"
                    onClick={addItem}
                  >
                    Add
                  </i>
                </button> :<button style={{backgroundColor:'blue',color:'white'}} type="edit">
                  {" "}
                  <i
                    className="fa fa-plus add-btn"
                    title="Add Item"
                    onClick={addItem}
                  >
                    Edit
                  </i>
                </button>
            }
          </div>
          <div className="showItems">
            <div className="showItems">
              {items.map((elem) => {
                return (
                  <div className="eachItem" key={elem.id}>
                    <h3>{elem.name}</h3>
                    <button  style={{backgroundColor:'blue',color:'white'}}type="submit">
                      <i
                        className="add"
                        title="delete item"
                        onClick={() => editItem(elem.id)}
                      >
                        Edit
                      </i>
                    </button>
                    <button style={{backgroundColor:'red',color:'white'}} type="submit">
                      <i
                        className="delete"
                        title="delete item"
                        onClick={() => deleteItem(elem.id)}
                      >
                        Delete
                      </i>
                    </button>
                  </div>
                );
              })}
 
              <button style={{backgroundColor:'black',color:'white'}}
                className="btn effect04"
                data-sm-link-text="Remove All "
                onClick={removeAll}
              >
                {" "}
                <span style={{backgroundColor:'black',color:'white'}}>-Remove All- </span>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
// sebestin saldanha made this TODO List app with CRUD operation and loacal storage 19 november 2021

export default Todo;
