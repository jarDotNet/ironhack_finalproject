<template>
  <Draggable v-for="task in tasks" :key="task.id">
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
        />
      </div>

      <div class="card-footer clearfix">
        <span class="float-left"
          ><span class="badge text-bg-category">Coding</span></span
        >
        <span class="float-left ms-3"
          ><span class="badge text-bg-warning">{{ task.priority }}</span></span
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
</template>
<script>
import { Draggable } from "vue3-smooth-dnd";
export default {
  components: {
    Draggable,
  },
  setup() {},
};
</script>
<style scoped>
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
</style>
