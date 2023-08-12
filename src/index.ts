import { v4 as uuidV4 } from 'uuid';
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};


const form = document.querySelector('#new-task-form') as HTMLFormElement;
const input = document.querySelector('#new-task-title') as HTMLInputElement;
const taskList = document.querySelector('#task-list') as HTMLUListElement;

const tasks: Task[] = loadtasks();
tasks.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input?.value == ' ' || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);

  addListItem(newTask);
  input.value = '';
  input.focus();
  saveTasks();
});
function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', () => {
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks.splice(index, 1);
      saveTasks();
      item.remove(); // Remove the item from the DOM
    }
  });
  label.append(checkbox, ' ', task.title, ' ', deleteButton);
  item.append(label);
  taskList?.append(item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}
function loadtasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
