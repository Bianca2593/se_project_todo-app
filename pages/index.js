import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"]; 
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");


const openModal = (modal) => {
  modal.classList.add("popup_visible");
};


const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};


const renderTodo = (item) => {
  const todo = new Todo(item, "#todo-template");
  todosList.append(todo.getView());
};


addTodoButton.addEventListener("click", () => openModal(addTodoPopup));


addTodoCloseBtn.addEventListener("click", () => closeModal(addTodoPopup));


addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value.trim();
  const dateInput = evt.target.date.value.trim();

  if (!name || !dateInput) return;
  
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };

  renderTodo(values); 

  addTodoForm.reset(); 
  newTodoValidator.resetValidation(); 
  closeModal(addTodoPopup);
});


initialTodos.forEach(renderTodo);


const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
