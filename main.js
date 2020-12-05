// declare redux
const { createStore } = window.Redux;

const initialTodoList = [{ id: 1, content: "Do Something" }];

// setup reducer
const todoReducer = (state = initialTodoList, action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const newList = [...state];
      newList.push({ id: state.length, content: action.payload });
      return newList;
    }
    case "REMOVE_TODO": {
      return state.filter((item) => item.id === action.payload.id);
    }
    default:
      return state;
  }
};

// declare store
const store = createStore(todoReducer);

//declare render function
const renderTodoList = (todoList) => {
  if (!Array.isArray(todoList)) return;
  const todoListElement = document.querySelector("#todoListId");
  todoListElement.innerHTML = "";
  for (const item of todoList) {
    const itemElement = document.createElement("li");
    itemElement.textContent = item.content;
    todoListElement.appendChild(itemElement);
  }
};

// render initial todo list
renderTodoList(initialTodoList);

// handle add item
const addFormElement = document.querySelector("#addFormId");
const handleAddItem = (e) => {
  const formTextElement = document.querySelector("#formTextId");
  e.preventDefault();
  const newItem = formTextElement.value;
  store.dispatch({
    type: "ADD_TODO",
    payload: newItem,
  });
  addFormElement.reset();
};
addFormElement.addEventListener("submit", handleAddItem);

//subcribe to store
store.subscribe(() => {
  renderTodoList(store.getState());
});
