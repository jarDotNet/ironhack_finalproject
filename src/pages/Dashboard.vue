<template>
  <div>
    <h1>To-do app</h1>

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
  </div>

  A partir de aquí<br />
  ________________________________________
  <br /><br />

  <!-- Button Add -->
  <button
    type="button"
    class="btn btn-custom-secondary text-capitalize"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    <font-awesome-icon
      icon="fa-solid fa-circle-plus"
      style="margin-right: 8px"
    />
    New Task
  </button>

  <!-- Modal Add Task -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4
            class="modal-title m-3 text-dark text-center card-title-text"
            style="font-weight: bold"
            id="exampleModalLabel"
          >
            Add a New Task
          </h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-dark w-75 m-auto pb-4">
          <div class="inputfield">
            <input
              type="text"
              id="task-name"
              class="inputField"
              ref="taskName"
              placeholder="Enter task name"
            />
          </div>
          <div class="d-grid gap-2">
            <button
              class="btn btn-custom btn-lg btn-block btn-profile"
              @click="createNewTask"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Edit Task -->

  <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4
            class="modal-title m-3 text-dark text-center card-title-text"
            style="font-weight: bold"
            id="exampleModalLabel"
          >
            Modify Your Task
          </h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-dark">
          <CardEdition v-model:editTask="taskToEdit" @saveTask="saveTask" />
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="text-left">
      <div class="row">
        <div class="col rounded-5 col-kanban">
          <h3>Backlog</h3>
          <hr />
          <Container
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            group-name="1"
            :get-child-payload="getChildPayload1"
            :drop-placeholder="dropPlaceholderOptions"
            @drop="handleDrop(TaskStateEnum.PENDING, $event)"
            style="height: 100px"
          >
            <Draggable v-for="task in tasksStore.pendingTasks" :key="task.id">
              <div class="card border border-0 mb-3" style="width: 100%">
                <li>
                  <div class="card-header">
                    <div class="d-flex justify-content-start">
                      <div class="p-1 mr-auto">
                        <span class="badge text-bg-category">Coding</span>
                      </div>
                      <div class="p-1">
                        <small class="text-muted">#{{ task.id }}</small>
                      </div>
                      <div class="p-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="card-body pt-1 pb-4">
                    <h4 class="card-title">{{ task.title }}</h4>
                  </div>

                  <div class="card-footer clearfix">
                    <span class="float-left"
                      ><p class="card-text">
                        <small class="text-muted">21 Sept</small>
                      </p></span
                    >
                    <span class="float-left ms-3"
                      ><span class="badge text-bg-warning">Low</span></span
                    >

                    <span class="float-right d-flex gap-1"
                      ><button
                        type="button"
                        class="btn btn-dark"
                        style="
                          --bs-btn-padding-y: 0.25rem;
                          --bs-btn-padding-x: 0.5rem;
                          --bs-btn-font-size: 0.75rem;
                        "
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        @click="editTask(task.id)"
                      >
                        <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        style="
                          --bs-btn-padding-y: 0.25rem;
                          --bs-btn-padding-x: 0.5rem;
                          --bs-btn-font-size: 0.75rem;
                        "
                        @click="deleteTask(task.id)"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-trash-can"
                        /></button
                    ></span>
                    <span class="float-right"
                      ><img
                        src="https://via.placeholder.com/28x28"
                        alt="Generic placeholder image"
                        class="img-fluid rounded-circle me-2"
                        style="width: 28px"
                    /></span>
                  </div>
                </li>
              </div>
            </Draggable>
          </Container>
        </div>

        <div class="col rounded-5 col-kanban">
          <h3>In Progress</h3>
          <hr />
          <Container
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            group-name="1"
            :get-child-payload="getChildPayload2"
            :drop-placeholder="dropPlaceholderOptions"
            @drop="handleDrop(TaskStateEnum.IN_PROGRESS, $event)"
            style="height: 100px"
          >
            <Draggable v-for="task in tasksStore.inProcessTasks" :key="task.id">
              <div class="card border border-0 mb-3" style="width: 100%">
                <li>
                  <div class="card-header">
                    <div class="d-flex justify-content-start">
                      <div class="p-1 mr-auto">
                        <span class="badge text-bg-category">Coding</span>
                      </div>
                      <div class="p-1">
                        <small class="text-muted">#{{ task.id }}</small>
                      </div>
                      <div class="p-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="card-body pt-1 pb-4">
                    <h4 class="card-title">{{ task.title }}</h4>
                  </div>

                  <div class="card-footer clearfix">
                    <span class="float-left"
                      ><p class="card-text">
                        <small class="text-muted">21 Sept</small>
                      </p></span
                    >
                    <span class="float-left ms-3"
                      ><span class="badge text-bg-warning">Low</span></span
                    >

                    <span class="float-right d-flex gap-1"
                      ><button
                        type="button"
                        class="btn btn-dark"
                        style="
                          --bs-btn-padding-y: 0.25rem;
                          --bs-btn-padding-x: 0.5rem;
                          --bs-btn-font-size: 0.75rem;
                        "
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        @click="editTask(task.id)"
                      >
                        <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        style="
                          --bs-btn-padding-y: 0.25rem;
                          --bs-btn-padding-x: 0.5rem;
                          --bs-btn-font-size: 0.75rem;
                        "
                        @click="deleteTask(task.id)"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-trash-can"
                        /></button
                    ></span>
                    <span class="float-right"
                      ><img
                        src="https://via.placeholder.com/28x28"
                        alt="Generic placeholder image"
                        class="img-fluid rounded-circle me-2"
                        style="width: 28px"
                    /></span>
                  </div>
                </li>
              </div>
            </Draggable>
          </Container>
        </div>

        <div class="col rounded-5 col-kanban">
          <h3>Done</h3>
          <hr />
          <Container
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            group-name="1"
            :get-child-payload="getChildPayload3"
            :drop-placeholder="dropPlaceholderOptions"
            @drop="handleDrop(TaskStateEnum.COMPLETED, $event)"
            style="height: 100px"
          >
            <Draggable v-for="task in tasksStore.completedTasks" :key="task.id">
              <div class="card border border-0 mb-3" style="width: 100%">
                <li>
                  <div class="card-header">
                    <div class="d-flex justify-content-start">
                      <div class="p-1 mr-auto">
                        <span class="badge text-bg-category">Coding</span>
                      </div>
                      <div class="p-1">
                        <small class="text-muted">#{{ task.id }}</small>
                      </div>
                      <div class="p-1">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="card-body pt-1 pb-4">
                    <h4 class="card-title">{{ task.title }}</h4>
                  </div>

                  <div class="card-footer clearfix">
                    <span class="float-left"
                      ><p class="card-text">
                        <small class="text-muted">21 Sept</small>
                      </p></span
                    >
                    <span class="float-left ms-3"
                      ><span class="badge text-bg-warning">Low</span></span
                    >

                    <span class="float-right d-flex gap-1"
                      ><button
                        type="button"
                        class="btn btn-dark"
                        style="
                          --bs-btn-padding-y: 0.25rem;
                          --bs-btn-padding-x: 0.5rem;
                          --bs-btn-font-size: 0.75rem;
                        "
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        @click="editTask(task.id)"
                      >
                        <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        style="
                          --bs-btn-padding-y: 0.25rem;
                          --bs-btn-padding-x: 0.5rem;
                          --bs-btn-font-size: 0.75rem;
                        "
                        @click="deleteTask(task.id)"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-trash-can"
                        /></button
                    ></span>
                    <span class="float-right"
                      ><img
                        src="https://via.placeholder.com/28x28"
                        alt="Generic placeholder image"
                        class="img-fluid rounded-circle me-2"
                        style="width: 28px"
                    /></span>
                  </div>
                </li>
              </div>
            </Draggable>
          </Container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useTasksStore from "../store/task";
import { useUserStore } from "../store/user";
import CardEdition from "../components/CardEdition.vue";
import TaskStateEnum from "../enums/TaskStateEnum";
import TaskPositionEnum from "../enums/TaskPositionEnum";
import { cardPosition } from "../utils/CardPosition";
import { Container, Draggable } from "vue3-smooth-dnd";

export default {
  name: "Dashboard",
  components: {
    CardEdition,
    Container,
    Draggable,
  },
  created() {
    this.TaskStateEnum = TaskStateEnum;
    this.TaskPositionEnum = TaskPositionEnum;
  },
  setup() {
    const taskId = ref(null);
    const taskName = ref(null);
    const taskToEdit = ref(null);
    const tasksStore = useTasksStore();
    const store = useUserStore();
    const idTask = ref(null);
    const dropPlaceholderOptions = ref({
      className: "drop-preview",
      animationDuration: "150",
      showOnTop: false,
    });
    const createNewTask = () => {
      const position = cardPosition(
        tasksStore.pendingTasks,
        TaskPositionEnum.BOTTOM
      );
      const newTask = {
        user_id: store.user.id,
        title: taskName.value.value,
        pos: position,
      };
      tasksStore.createTask(newTask);
    };
    const editTask = (taskId) => {
      const task = tasksStore.tasks.find((t) => t.id === taskId);
      taskToEdit.value = task;
    };
    const saveTask = (task) => {
      tasksStore.updateTask(
        task.id,
        task.title,
        task.current_state,
        task.priority,
        task.description
      );
    };
    const deleteTask = (taskId) => {
      tasksStore.deleteTask(taskId);
    };
    const markTaskAsCompleted = () => {
      tasksStore.markAs(TaskStateEnum.COMPLETED, taskId.value.value);
    };
    const markTaskAsInProgress = () => {
      tasksStore.markAs(TaskStateEnum.IN_PROGRESS, taskId.value.value);
    };
    const markTaskAsPending = () => {
      tasksStore.markAs(TaskStateEnum.PENDING, taskId.value.value);
    };

    const getChildPayload1 = (index) => {
      return tasksStore.pendingTasks[index];
    };
    const getChildPayload2 = (index) => {
      return tasksStore.inProcessTasks[index];
    };
    const getChildPayload3 = (index) => {
      return tasksStore.completedTasks[index];
    };

    const handleDrop = (state, dropResult) => {
      const { removedIndex, addedIndex, payload } = dropResult;
      if (removedIndex === addedIndex) return;

      if (addedIndex !== null) {
        let tasks = null;
        switch (state) {
          case TaskStateEnum.COMPLETED:
            tasks = tasksStore.completedTasks;
            break;

          case TaskStateEnum.IN_PROGRESS:
            tasks = tasksStore.inProcessTasks;
            break;

          default:
            tasks = tasksStore.pendingTasks;
            break;
        }
        const position = cardPosition(tasks, addedIndex);
        tasksStore.markAs(state, payload.id, position);
      }
    };

    onMounted(() => {
      tasksStore.fetchTasks();
      if (tasksStore.tasks.lengt > 0) taskToEdit.value = tasksStore.tasks[0];
    });
    return {
      taskId,
      taskName,
      tasksStore,
      taskToEdit,
      idTask,
      dropPlaceholderOptions,
      createNewTask,
      editTask,
      saveTask,
      deleteTask,
      markTaskAsCompleted,
      markTaskAsInProgress,
      markTaskAsPending,
      getChildPayload1,
      getChildPayload2,
      getChildPayload3,
      handleDrop,
    };
  },
};
</script>

<style scoped>
.col-kanban {
  width: 100%;
  padding: 2rem;
  margin: 0.5rem;
  background-color: #ddd;
  height: 300px;
  overflow: auto;
}

.col-kanban::-webkit-scrollbar {
  display: none;
}

.col-kanban h3 {
  color: var(--custom-color-secondary);
  font-size: 22px;
  text-transform: capitalize;
}

.col-kanban h3:before {
  content: "» ";
}

.col-kanban hr {
  border-top: 3px solid var(--custom-color-secondary);
  opacity: 0.4;
  position: relative;
  top: -18px;
}

ul li {
  list-style: none;
}

ul {
  padding: 0;
}

.card-footer,
.card-header {
  border-bottom: none;
  background-color: var(--bs-card-bg);
}

.card-footer {
  border-top: 1px solid rgb(217, 217, 217);
}

.card-title {
  font-size: 16px;
}

.card-footer {
  padding: 8px 16px;
}

.card-footer-item {
  margin: 0 10px;
}

.badge {
  opacity: 0.7;
}

.badge:hover {
  opacity: 1;
  transition: 0.5s ease-in-out 100ms;
}

.category {
  width: 80%;
}

.p-cat {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border-radius: var(--custom-border-radius);
  background-color: var(--bg-color-management);
  color: #fff;
}

.mr-auto {
  margin-right: auto;
}

.text-bg-category {
  color: #000;
  background-color: var(--bg-color-coding);
}

:deep(path) {
  color: #fff;
}

.form-check-input:checked {
  background-color: #4e94fb;
  border-color: #4e94fb;
}

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}
.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}
.drop-preview {
  background-color: rgba(blue);
  margin: 1rem 2rem 1rem 0.3rem;
}
</style>
