<template>
   <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center">
         <div
            class="col-md-12 col-xl-10 d-flex flex-column flex-lg-row justify-content-center mt-5"
         >
            <div
               class="col-sm-12 col-md-4 col-xl-4 p-2 justify-content-center text-start"
            >
               <h1 class="text-center fw-bolder mb-3 p-2" style="color:#fff; background-color: #635e94ed">TrackLab</h1>

               <h2 v-if="taskStore.length === 0">Welcome, {{ username }}!</h2>
               <h2 v-else>Welcome back, {{ username }}!</h2>

               <p>
                  Are you ready? Start managing your tasks easily through our
                  customized dashboard.
               </p>

               <p class="text-center">
                  <strong>Simpler</strong>, <strong>Easier</strong> and
                  <strong>Faster</strong>!
               </p>

               <img src="../assets/img-tasks.svg" alt="" />

               <router-link to="/dashboard">Dashboard</router-link>
            </div>

            <div class="col-sm-12 col-md-8 col-xl-8 px-5 text-start align-self-center">
               <div v-if="taskStore.length === 0"></div>

               <div v-else>
                  <h2>Let's take a look!</h2>

                  <div class="col-12">
                     <div class="card border my-3" style="width: 100%">
                        <div
                           class="card-body d-flex justify-content-start pb-1"
                        >
                           Hola
                        </div>
                     </div>
                  </div>
               </div>

               Actualmente tienes
               <b>{{ taskStore.pendingTasks.length }}</b> tareas activas, tienes
               <b>{{ taskStore.inProcessTasks.length }}</b> tareas en proceso,
               tienes <b>{{ taskStore.completedTasks.length }}</b> tareas
               completadas
            </div>
         </div>
      </div>
   </div>

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
         Actualmente no tienes ninguna tarea creada, si deseas crear una,
         dirijete a tu dashboard
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
