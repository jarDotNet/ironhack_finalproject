<template>
  <div>
    <h1>To-do app</h1>
    <input
      type="text"
      id="task-name"
      class="inputField"
      ref="taskName"
      placeholder="Enter task name"
    />
    <button class="button primary block" @click="createNewTask">
      New Task
    </button>
    <br />
    <input
      type="text"
      id="task-id"
      class="inputField"
      ref="taskId"
      placeholder="Enter task Id to delete"
    />
    <button class="btn btn-danger block" @click="deleteTask">
      Delete Task
    </button>
  </div>

  <h2>Kanban</h2>

<div class="container">
  <div class="row justify-content-md-center">
    <div class="col">

      <div class="columna-contenedor">
        <div class="columna-heading">
          <h3>Backlog</h3>
        </div>
 
        <div id="backlog">
        <div class="kanban-card" draggable="true">
          This is a Card 1

        </div>

        <div class="kanban-card" draggable="true">
          This is a Card 2
        </div>

        <div class="kanban-card" draggable="true">
          This is a Card 3
        </div>

      </div>

      </div>


    </div>
    <div class="col">
      
      <div class="columna-contenedor">
        <div class="columna-heading">
          <h3>Doing</h3>
        </div>

        <div id="doing">
        <div class="kanban-card" draggable="true">
          This is a Card 1 

        </div>

        <div class="kanban-card" draggable="true">
          This is a Card 2
        </div>

        <div class="kanban-card" draggable="true">
          This is a Card 3
        </div>
      </div>

      </div>

    </div>
    <div class="col">
      
      <div class="columna-contenedor">
        <div class="columna-heading">
          <h3>Done</h3>
        </div>

        <div id="done">
        <div class="kanban-card" draggable="true">
          This is a Card 1

        </div>

        <div class="kanban-card" draggable="true">
          This is a Card 2
        </div>

        <div class="kanban-card" draggable="true">
          This is a Card 3
        </div>

      </div>

      </div>

    </div>
  </div>
</div>



</template>

<script>
import { ref } from "vue";
import useTasksStore from "../store/task";
import { store } from "../store/auth";

export default {
  name: "Dashboard",

  setup() {
    const taskId = ref(null);
    const taskName = ref(null);
    const tasksStore = useTasksStore();

    const createNewTask = () => {
      const newTask = {
        user_id: store.user.id,
        title: taskName.value.value,
      };
      tasksStore.createTask(newTask);
    };

    const deleteTask = () => {
      tasksStore.deleteTask(taskId.value.value);
    };

    return { taskId, taskName, tasksStore, createNewTask, deleteTask };
  },
}
</script>

<style scoped>
  .kanban-card{
    margin: 10px;
  }
</style>