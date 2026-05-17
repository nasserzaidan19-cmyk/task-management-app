import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  // --- Public Authentication Layer ---
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/views/auth/SignupView.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/auth/ForgotPasswordView.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/views/auth/ResetPasswordView.vue'),
        meta: { requiresAuth: false },
      },
    ],
  },

  // --- Private Authenticated Core Workspace ---
  {
    path: '/',
    name: 'workspace',
    component: () => import('@/layouts/AppShell.vue'),
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/HomeView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/users/ProfileView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/UsersListView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/views/projects/ProjectsListView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'projects/:id',
        name: 'project-details',
        component: () => import('@/views/projects/ProjectDetailsView.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'projects/:id/board',
        name: 'project-board',
        component: () => import('@/views/projects/ProjectBoardView.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('@/views/tags/TagsListView.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // --- 404 Catch-All Fallback Boundary ---
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/NotFoundView.vue'),
    meta: { layout: 'blank', requiresAuth: false },
  },
]
