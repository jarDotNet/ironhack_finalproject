<template>
  <div v-if="alert" class="container">
    <div class="m-3">
      <div class="alert alert-dismissable" :class="alert.type">
        {{ alert.message }}
        <button
          @click="alertStore.clear()"
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAlertStore } from "../store/alert";

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<style scoped>
.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.75rem 1.25rem;
  background-color: transparent;
  border: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0.6;
}

.close:focus,
.close:hover {
  color: #000;
  text-decoration: none;
  opacity: 0.8;
}

span {
  color: #856404;
}
</style>
