<template>
  <h1 class="text-center">Home Page</h1>
  <h2>
    Hola {{ username }}, bienvenido a TrackLab, aplicación web donde podra
    gestionar sus tareas
  </h2>
  <div v-if="taskStore.tasks">
    <p>
      Actualmente tienes <b>{{ taskStore.pendingTasks.length }}</b> tareas
      activas, tienes <b>{{ taskStore.inProcessTasks.length }}</b> tareas en
      proceso, tienes <b>{{ taskStore.completedTasks.length }}</b> tareas
      completadas
    </p>
  </div>
  <div v-else>
    <p>
      Actualmente no tienes ninguna tarea creada, si deseas crear una, dirijete
      a tu dashboard
    </p>
  </div>
  <router-link to="/dashboard"> Ir a dashboard</router-link>
</template>

<script>
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useUserStore } from "../store/user";
import { ref } from "vue";
import { supabase } from "../supabase";
import useTasksStore from "../store/task";
export default {
  setup() {
    const store = useUserStore();
    const username = ref("");
    const taskStore = useTasksStore();

    async function getProfile() {
      try {
        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username`)
          .eq("id", store.user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          username.value = data.username;
        }
      } catch (error) {
        console.log(error);
      }
    }

    onMounted(() => {
      getProfile();
      taskStore.fetchTasks();
    });

    onUpdated(() => {
      getProfile();
    });

    return {
      store,
      username,
      taskStore,
    };
  },
};
</script>

<style></style>
