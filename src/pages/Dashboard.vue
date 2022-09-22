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
    <br />
    <input
      type="text"
      id="task-id"
      class="inputField"
      ref="taskId"
      placeholder="Enter task Id"
    />
    <button class="btn btn-danger block" @click="deleteTask">
      Delete Task
    </button>
    <br />
    <button class="btn btn-success block" @click="markTaskAsCompleted">
      Mark Task as Completed
    </button>
    <button class="btn btn-secondary block" @click="markTaskAsInProgress">
      Mark Task as In Progress
    </button>
    <button class="btn btn-info block" @click="markTaskAsPending">
      Mark Task as Pending
    </button>
    <br />
    <input type="hidden" id="edit-id" />
    <input
      type="text"
      id="edit-name"
      class="inputField"
      placeholder="Task name"
    />
    <select id="edit-state" class="form-control">
      <option value="pending" style="color: black">Pending</option>
      <option value="in-progress" style="color: black">In progress</option>
      <option value="completed" style="color: black">Completed</option>
    </select>
    <textarea
      id="edit-description"
      rows="4"
      cols="50"
      style="color: black; width: 100%"
    />
    <button class="button primary block" @click="saveTask">Save Task</button>
    <ul v-for="task in tasksStore.tasks" :key="task.id">
      <li>
        <b>Id:</b> {{ task.id }} - <b>Title:</b> {{ task.title }} -
        <b>State:</b>
        {{ task.current_state }}
        <button class="btn btn-light" @click="editTask(task.id)">Edit</button>
      </li>
    </ul>
  </div>

  <h2>Kanban</h2>

<div class="container text-left">
  <div class="row">
    <div class="col rounded-5 col-kanban">
      
      <h3>Backlog</h3>
      <hr>

      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />
    </div>
      <div class="col rounded-5 col-kanban">

      <h3>In progress</h3>
      <hr>

      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />
    </div>
    <div class="col rounded-5 col-kanban">

      <h3>done</h3>
      <hr>

      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />

      <kanbanCard draggable="true" />
    </div>
  </div>
</div>

</template>

<script>
import { ref, onMounted } from "vue";
import useTasksStore from "../store/task";
import { store } from "../store/auth";
import kanbanCard from "../components/Card.vue"

export default {
  name: "Dashboard",
  components: {
        kanbanCard
    },

  setup() {
    const taskId = ref(null);
    const taskName = ref(null);
    const tasksStore = useTasksStore();
    const store = useUserStore();

    const createNewTask = () => {
      const newTask = {
        user_id: store.user.id,
        title: taskName.value.value,
      };
      tasksStore.createTask(newTask);
    };

    const editTask = (taskId) => {
      const task = tasksStore.tasks.find((t) => t.id === taskId);
      const id = document.getElementById("edit-id");
      const title = document.getElementById("edit-name");
      const state = document.getElementById("edit-state");
      const description = document.getElementById("edit-description");
      id.value = taskId;
      title.value = task.title;
      state.value = task.current_state;
      description.value = task.description;
    };

    const saveTask = () => {
      const taskId = document.getElementById("edit-id").value;
      const title = document.getElementById("edit-name").value;
      const state = document.getElementById("edit-state").value;
      const description = document.getElementById("edit-description").value;
      tasksStore.updateTask(taskId, title, state, description);
    };

    const deleteTask = () => {
      tasksStore.deleteTask(taskId.value.value);
    };

    const markTaskAsCompleted = () => {
      tasksStore.markAsCompleted(taskId.value.value);
    };

    const markTaskAsInProgress = () => {
      tasksStore.markAsInProgress(taskId.value.value);
    };

    const markTaskAsPending = () => {
      tasksStore.markAsPending(taskId.value.value);
    };

    onMounted(() => {
      tasksStore.fetchTasks();
    });

    return {
      taskId,
      taskName,
      tasksStore,
      createNewTask,
      editTask,
      saveTask,
      deleteTask,
      markTaskAsCompleted,
      markTaskAsInProgress,
      markTaskAsPending,
    };
  },
}
</script>

<style></style>
>>>>>>> 6b1e7d855ec17c9b47a8539a57ef1893d7d22106
