import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "layouts/MainLayout.vue";
import LoginPage from "pages/LoginPage.vue";
import DashboardPage from "pages/DashboardPage.vue";
import SalesReportsPage from "pages/SalesReports.vue";
import UsersPage from "pages/UsersPage.vue";
import EmployeesPage from "pages/EmployeesPage.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/dashboard",
    component: MainLayout,
    children: [{ path: "", component: DashboardPage }],
    meta: { requiresAuth: true },
  },
  {
    path: "/salesreports",
    component: MainLayout,
    children: [{ path: "", component: SalesReportsPage }],
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    component: MainLayout,
    children: [{ path: "", component: UsersPage }],
    meta: { requiresAuth: true },
  },
  {
    path: "/employees",
    component: MainLayout,
    children: [{ path: "", component: EmployeesPage }],
    meta: { requiresAuth: true },
  },
  {
    path: "/logout",
    component: () => {
      sessionDestroy();
      localStorage.removeItem("token");
      return LoginPage;
    },
  },
];

function sessionCheck() {
  const token = localStorage.getItem("token");
  return token ? true : false;
}

function sessionDestroy() {
  localStorage.removeItem("token");
}

let sessionTimer;

function startSessionTimer() {
  if (!sessionCheck()) return;

  sessionTimer = setInterval(() => {
    alert("Session expired. Please login again.");
    sessionDestroy();
    router.push("/");
  }, 1000 * 60 * 5);
}

function resetSessionTimer() {
  clearInterval(sessionTimer);
  startSessionTimer();
}

document.addEventListener("mousemove", resetSessionTimer);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !sessionCheck()) {
    next("/");
  } else {
    if (to.meta.requiresAuth) {
      startSessionTimer();
    }
    next();
  }
});

export default router;




// import { createRouter, createWebHistory } from "vue-router";
// import MainLayout from "layouts/MainLayout.vue";
// import LoginPage from "pages/LoginPage.vue";
// import DashboardPage from "pages/DashboardPage.vue";
// import SalesReportsPage from "pages/SalesReports.vue";
// import UsersPage from "pages/UsersPage.vue";
// import EmployeesPage from "pages/EmployeesPage.vue";

// const routes = [
//   {
//     path: "/",
//     component: LoginPage,
//   },
//   {
//     path: "/dashboard",
//     component: MainLayout,
//     children: [{ path: "", component: DashboardPage }],
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/salesreports",
//     component: MainLayout,
//     children: [{ path: "", component: SalesReportsPage }],
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/users",
//     component: MainLayout,
//     children: [{ path: "", component: UsersPage }],
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/employees",
//     component: MainLayout,
//     children: [{ path: "", component: EmployeesPage }],
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/logout",
//     component: () => {
//       sessionDestroy();
//       localStorage.removeItem("token");
//       return LoginPage;
//     },
//   },
// ];

// function sessionCheck() {
//   const token = localStorage.getItem("token");
//   return token ? true : false;
// }

// function sessionDestroy() {
//   localStorage.removeItem("token");
// }

// let sessionTimer;
// function startSessionTimer() {
//   sessionTimer = setInterval(() => {
//     alert("Session expired. Please login again.");
//     sessionDestroy();
//     router.push("/");
//   }, 1000 * 5 * 1); // 5 min if user does not move mouse
// }

// function resetSessionTimer() {
//   clearInterval(sessionTimer);
//   startSessionTimer();
// }

// document.addEventListener("mousemove", resetSessionTimer);

// startSessionTimer();

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !sessionCheck()) {
//     next("/");
//   } else {
//     next();
//   }
// });

// export default router;




// import { createRouter, createWebHistory } from "vue-router";
// import MainLayout from "layouts/MainLayout.vue";
// import LoginPage from "pages/LoginPage.vue";
// import DashboardPage from "pages/DashboardPage.vue";
// import SalesReportsPage from "pages/SalesReports.vue";
// import UsersPage from "pages/UsersPage.vue";
// import EmployeesPage from "pages/EmployeesPage.vue";

// const routes = [
//   {
//     path: "/",
//     component: LoginPage,
//   },
//   {
//     path: "/dashboard",
//     component: MainLayout,
//     children: [{ path: "", component: DashboardPage }],
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/salesreports",
//     component: MainLayout,
//     children: [{ path: "", component: SalesReportsPage }],
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/users",
//     component: MainLayout,
//     children: [{ path: "", component: UsersPage }],
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/employees",
//     component: MainLayout,
//     children: [{ path: "", component: EmployeesPage }],
//     meta: { requiresAuth: true },
//   },
//   {
//     path: "/logout",
//     component: () => {
//       sessionDestroy();
//       localStorage.removeItem("token");
//       return LoginPage;
//     },
//   }
// ];

// function sessionCheck() {
//   const token = localStorage.getItem("token");
//   return token ? true : false;
// }

// sessionCheck();

// function sessionDestroy() {
//   localStorage.removeItem("token");
// }

// function timer() {
//   setInterval(() => {
//     sessionDestroy();
//   }, 1000 * 60 * 10);
// }

// timer();

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");

//   if (!token && to.path !== "/") {
//     next("/");
//   } else {
//     next();
//   }
// });

// export default router;







//                      DO NOT TOUCH                     // router.beforeEach((to, from, next) => {
//                      DO NOT TOUCH                     //   const token = localStorage.getItem("token");
//                      DO NOT TOUCH                     //   if (to.meta.requiresAuth && !token) {
//                      DO NOT TOUCH                     //     next("/");
//                      DO NOT TOUCH                     //   } else {
//                      DO NOT TOUCH                     //     next();
//                      DO NOT TOUCH                     //   }
//                      DO NOT TOUCH                     // });
