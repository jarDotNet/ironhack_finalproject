<template>
  <div v-if="store.isAuthenticated" class="container h-100">
    <div class="row d-flex justify-content-center align-items-center">
      <div
        class="
          col-md-12 col-xl-10
          d-flex
          flex-column flex-lg-row
          justify-content-center
          mt-5
          home-box
        "
      >
        <div
          class="
            col-sm-12 col-md-5 col-xl-5
            p-2
            justify-content-center
            text-center
          "
        >
          <h1 class="text-center fw-bolder mb-3 p-3 bg-background rounded">
            TrackLab
          </h1>

          <h2 v-if="profileStore.profile.username" class="mt-5">
            Welcome back, {{ profileStore.profile.username }}!
          </h2>
          <h2 v-else class="mt-5">Welcome!</h2>

          <p>
            Are you ready? Start managing your tasks easily through our
            customized dashboard.
          </p>

          <p class="text-center">
            <strong>Simpler</strong>, <strong>Easier</strong> and
            <strong>Faster</strong>!
          </p>

          <img
            src="../assets/img-tasks.svg"
            alt="ilustration of a man adding a task to a dashboard"
            class="home-main-img"
          />
        </div>

        <div class="col-sm-12 col-md-7 col-xl-7 px-5 text-start p-2">
          <div
            v-if="taskStore.tasks"
            class="d-flex flex-column align-items-center text-center"
          >
            <h2
              v-if="taskStore.tasks.length !== 0"
              class="fw-bolder mb-3 p-3 board-header"
            >
              Let's take a look!
            </h2>

            <h2 v-else class="fw-bolder mb-3 p-3 board-header">
              Seems like a good start!
            </h2>

            <p class="w-75" v-if="taskStore.tasks.length !== 0">
              How's your assignments going? it looks like you've got everything
              under control, keep it up!
            </p>

            <p class="w-75" v-else>
              It looks like you still have no tasks to take care of.... How
              about creating your first task and increasing this counter? Follow
              the link at the end!
            </p>

            <div class="card home-card">
              <div class="card-content">
                <div class="card-body p-2">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <font-awesome-icon icon="fa-regular fa-clock" />
                    <div class="text-right">
                      <h3 class="fw-bolder">
                        {{ taskStore.pendingTasks.length }}
                      </h3>
                      <p class="small mb-0">Pending Tasks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card home-card">
              <div class="card-content">
                <div class="card-body p-2">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <font-awesome-icon icon="fa-regular fa-pen-to-square" />
                    <div class="text-right">
                      <h3 class="fw-bolder">
                        {{ taskStore.inProcessTasks.length }}
                      </h3>
                      <p class="small mb-0">In Progress Tasks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card home-card">
              <div class="card-content">
                <div class="card-body p-2">
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <font-awesome-icon icon="fa-regular fa-circle-check" />
                    <div class="text-right">
                      <h3 class="fw-bolder">
                        {{ taskStore.completedTasks.length }}
                      </h3>
                      <p class="small mb-0">Closed Tasks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <router-link to="/dashboard"
              ><button type="submit" class="btn btn-custom btn-lg mt-4">
                <span class="text-white" v-if="taskStore.tasks.length !== 0"
                  >Go To Dashboard</span
                >
                <span class="text-white" v-else>Start Your Dashboard</span>
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { onMounted, onUpdated } from "@vue/runtime-core";
import { useUserStore, useTasksStore, useAlertStore } from "../store/";
import { supabase } from "../supabase";
import { useProfileStore } from "../store/profile";

export default {
  setup() {
    const username = ref("");
    const store = useUserStore();
    const taskStore = useTasksStore();
    const alertStore = useAlertStore();
    const profileStore = useProfileStore();

    onMounted(() => {
      profileStore.getProfile();
      taskStore.fetchTasks();
    });

    return {
      store,
      username,
      taskStore,
      profileStore,
    };
  },
};
</script>

<style scoped>
.home-main-img {
  height: 300px;
}

.home-card {
  max-width: 320px;
  border-radius: 0.5em;
  box-shadow: 0 10px 40px 0 rgb(62 57 107 / 7%), 0 2px 9px 0 rgb(62 57 107 / 6%);
  border: 1px solid #00000012;
  opacity: 0.6;
  transition: all 0.8s ease;
}

.home-card:hover {
  opacity: 1;
}

.home-card:not(:first-child) {
  margin-top: 1em;
}

.home-card h3 {
  color: #470abe;
}

.home-card .svg-inline--fa {
  height: 3em;
  padding: 0 1em;
}

.board-header {
  font-size: 2.5em;
}

:deep(path) {
  fill: #470abe;
}

@media (min-width: 1600px) {
  .home-box {
    margin-top: 7em !important;
  }
}
</style>
