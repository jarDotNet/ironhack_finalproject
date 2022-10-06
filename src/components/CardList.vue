<template>
  <div class="board-col">
    <h3 class="mt-0 board-header">
      <span class="icon-back"></span> {{ state.title }}
    </h3>

    <div class="board-tasks">
      <Container
        drag-class="card-ghost"
        drop-class="card-ghost-drop"
        group-name="tracklab"
        :get-child-payload="getChildPayload"
        :drop-placeholder="dropPlaceholderOptions"
        @drop="handleDrop($event)"
        style="height: 300px"
      >
        <Draggable v-for="task in state.tasks" :key="task.id">
          <div class="card border my-3" style="width: 100%">
            <div class="card-body d-flex justify-content-start pb-1">
              <h4 class="card-title kanban-card-title mr-auto">
                {{ task.title }}
              </h4>
              <input
                class="form-check-input check-input-card m-0"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                :checked="task.current_state == TaskStateEnum.COMPLETED"
                :disabled="task.current_state == TaskStateEnum.COMPLETED"
                @change="changeStatus(task)"
              />
            </div>

            <div class="card-footer clearfix">
              <span class="float-left"
                ><span class="badge text-bg-category">Coding</span></span
              >
              <span class="float-left ms-3"
                ><span class="badge text-bg-warning">{{
                  task.priority
                }}</span></span
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
                  @click="$emit('editTask', task)"
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
                  <font-awesome-icon icon="fa-solid fa-trash-can" /></button
              ></span>
              <span class="float-right"
                ><img
                  src="https://via.placeholder.com/28x28"
                  alt="Generic placeholder image"
                  class="img-fluid rounded-circle me-2"
                  style="width: 28px"
              /></span>
            </div>
          </div>
        </Draggable>
      </Container>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onUpdated } from "vue";
import { cardPosition } from "../utils/CardPosition";
import { Container, Draggable } from "vue3-smooth-dnd";
import TaskStateEnum from "../enums/TaskStateEnum";
import useTasksStore from "../store/task";

export default defineComponent({
  name: "CardList",
  emits: ["editTask"],
  components: {
    Container,
    Draggable,
  },
  props: {
    cards: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
    current_sate: {
      type: String,
      required: true,
    },
  },
  created() {
    this.TaskStateEnum = TaskStateEnum;
  },
  setup(props, { emit }) {
    const tasksStore = useTasksStore();

    const state = reactive({
      tasks: [],
      title: "",
    });

    const dropPlaceholderOptions = ref({
      className: "drop-preview",
      animationDuration: "150",
      showOnTop: false,
    });

    const editTask = (task) => {
      emit("editTask", task);
    };

    const deleteTask = (taskId) => {
      tasksStore.deleteTask(taskId);
    };

    const changeStatus = (task) => {
      tasksStore.markAs(TaskStateEnum.COMPLETED, task.id, task.position);
    };

    const getChildPayload = (index) => {
      return state.tasks[index];
    };

    const handleDrop = (dropResult) => {
      const { removedIndex, addedIndex, payload } = dropResult;
      if (removedIndex === addedIndex) return;
      if (addedIndex !== null) {
        const position = cardPosition(state.tasks, addedIndex);
        tasksStore.markAs(props.current_sate, payload.id, position);
      }
    };

    onUpdated(() => {
      state.tasks = props.cards;
      state.title = props.title;
    });

    return {
      state,
      dropPlaceholderOptions,
      editTask,
      deleteTask,
      changeStatus,
      getChildPayload,
      handleDrop,
    };
  },
});
</script>

<style scoped>
.board-col {
  display: inline-block;
  width: 24em;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 15px 30px 15px;
  margin-bottom: 24px;
  border-radius: 0 0 15px 15px;
  background: #f5f4f8;
  vertical-align: top;
}

.board-col:not(:last-child) {
  margin-right: 2em;
}

.board-header {
  padding: 1rem;
  margin: 0 -1rem;
  color: #fff;
  background: #635e94ed;
  font-size: 1em;
}

.board-tasks {
  position: relative;
}

.board-tasks:before {
  content: "No tasks in here!";
  width: 100%;
  color: rgb(112, 112, 112);
  position: absolute;
  line-height: 6em;
  text-align: center;
}
.icon-back:before {
  content: "\f0ae";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #fff;
  margin: 0.5em;
}

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg);
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg);
}

.kanban-card-title {
  max-width: 285px;
  white-space: break-spaces;
  line-height: 1.5em;
}

.check-input-card {
  padding: 6px;
  float: right;
}

.form-check-input:checked {
  background-color: #4e94fb;
  border-color: #4e94fb;
}

.text-bg-category {
  color: #000;
  background-color: var(--bg-color-coding);
}

.mr-auto {
  margin-right: auto;
}

.badge:hover {
  opacity: 1;
  transition: 0.5s ease-in-out 100ms;
}

.badge {
  opacity: 0.7;
}

.card-footer {
  border-bottom: none;
  background-color: var(--bs-card-bg);
  border-top: 1px solid rgb(217, 217, 217);
  padding: 8px 16px;
  border: 0;
}

.card-title {
  font-size: 16px;
}
</style>