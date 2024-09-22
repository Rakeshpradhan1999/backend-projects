import { Command } from "commander";
import * as fs from "fs";
import * as path from "path";

const program = new Command();

const tasksFilePath = path.join(process.cwd(), "tasks.json");

if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, "[]");
}

interface Task {
  id: number;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function getTasks(): Task[] {
  const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));
  return tasks;
}

function addTask(description: string): void {
  const tasks = getTasks();
  const newTask = {
    id: tasks.length + 1,
    description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

program
  .command("add <description>")
  .description("Add a new task")
  .action((description: string) => {
    addTask(description);
  });

program
  .command("list [status]")
  .description("List all tasks")
  .action((status: string) => {
    if (!status) {
      const tasks = getTasks();
      console.log(tasks);
      return;
    }
    const tasks = getTasks().filter((task) => task.status === status);
    console.log(tasks);
  });

program
  .command("mark-done <id>")
  .description("Mark a task as done")
  .action((id: string) => {
    let tasks = getTasks();
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
      console.log("Task not found");
      return;
    }
    task.status = "done";
    const filteredTasks = tasks.filter((task) => task.id !== parseInt(id));
    filteredTasks.push(task);
    tasks = filteredTasks;
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    console.log(`Task marked as done (ID: ${task.id})`);
  });

program
  .command("mark-in-progress <id>")
  .description("Mark a task as in progress")
  .action((id: string) => {
    let tasks = getTasks();
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
      console.log("Task not found");
      return;
    }
    task.status = "in-progress";
    const filteredTasks = tasks.filter((task) => task.id !== parseInt(id));
    filteredTasks.push(task);
    tasks = filteredTasks;
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    console.log(`Task marked as done (ID: ${task.id})`);
  });

program
  .command("update <id> <description>")
  .action((id: string, description: string) => {
    let tasks = getTasks();
    const task = tasks.find((task) => task.id === parseInt(id));
    if (!task) {
      console.log("Task not found");
      return;
    }
    task.description = description;
    const filteredTasks = tasks.filter((task) => task.id !== parseInt(id));
    filteredTasks.push(task);
    tasks = filteredTasks;
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    console.log(`Task updated successfully (ID: ${task.id})`);
  });

program.command("delete <id>").action((id: string) => {
  let tasks = getTasks();
  const task = tasks.find((task) => task.id === parseInt(id));
  if (!task) {
    console.log("Task not found");
    return;
  }
  const filteredTasks = tasks.filter((task) => task.id !== parseInt(id));
  fs.writeFileSync(tasksFilePath, JSON.stringify(filteredTasks, null, 2));
  console.log(`Task deleted successfully (ID: ${task.id})`);
});
program.parse();
