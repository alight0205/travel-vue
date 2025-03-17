import { Message } from '@arco-design/web-vue'
import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/stores/user-store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "web",
      path: "/",
      component: () => import("@/views/web/index.vue"),
      children: [
        {
          name: "home",
          path: "",
          component: () => import("@/views/web/home.vue")
        },
        {
          name: "center",
          path: "center",
          component: () => import("@/views/web/center/index.vue"),
          children: [
            {
              name: "userInfo",
              path: "userInfo",
              component: () => import("@/views/web/center/userInfo.vue"),
            },
            {
              name: "myArticle",
              path: "myArticle",
              component: () => import("@/views/web/center/myArticle.vue")
            },
            {
              name: "myComment",
              path: "myComment",
              component: () => import("@/views/web/center/myComment.vue")
            },
            {
              name: "myLike",
              path: "myLike",
              component: () => import("@/views/web/center/myLike.vue")
            },
            {
              name:"myCollect",
              path:"myCollect",
              component: ()=>import("@/views/web/center/myCollect.vue")
            }
          ]
        },
        {
          name: "article",
          path: "article",
          children:[
            {
              name:"articleDetail",
              path:"detail",
              component:()=>import("@/views/web/article/articleDetail.vue")
            },
            // {
            //   name:"articleList",
            //   path:"list",
            //   component:()=>import("@/views/web/article/list.vue")
            // },
            {
              name:"articleAdd",
              path:"create",
              component:()=>import("@/views/web/article/articleAdd.vue")
            },
            {
              name:"articleEdit",
              path:"edit",
              component:()=>import("@/views/web/article/articleEdit.vue")
            }
          ]
        },
        {
          name:"user",
          path:"user",
          component:()=>import("@/views/web/user/index.vue"),
          children:[
            {
              name:"userDetail",
              path:"detail",
              component:()=>import("@/views/web/user/userDetail.vue")
            }
          ]
        },
        {
          name:"place",
          path:"place",
          component:()=>import("@/views/web/place/index.vue"),
        }
      ]
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/account/index.vue'),
    },
    {
      // 管理
      name: "admin",
      path: "/admin",
      component: () => import("@/views/admin/index.vue"),
      meta: {
        title: "首页",
        // role: [1] //1管理员 2普通用户 3游客
      },
      children: [
        {
          name: "welcome",
          path: "",
          component: () => import("@/views/admin/home/index.vue"),
          meta: {
            title: "首页"

          },
        },
        {
          name: "userManage",
          path: "user_manage",
          meta: {
            title: "用户管理",
            // role: [1]
          },
          children: [
            {
              name: "userList",
              path: "user_list",
              component: () => import("@/views/admin/user_manage/index.vue"),
              meta: {
                title: "用户列表"
              },
            }
          ]
        },
        {
          name: "articleManage",
          path: "article_center",
          meta: {
            title: "文章管理",
            // role: [1] //1管理员 2普通用户 3游客
          },
          children: [
            {
              name: "articleList",
              path: "article_list",
              component: () => import("@/views/admin/article_center/index.vue"),
              meta: {
                title: "文章列表"
              },
            }
          ]
        },
        {
          name: "commentsManage",
          path: "comments_manage",
          meta: {
            title: "评论管理",
            // role: [1]
          },
          children: [
            {
              name: "commentsList",
              path: "comments_list",
              component: () => import("@/views/admin/comments_manage/index.vue"),
              meta: {
                title: "评论列表"
              },
            }
          ]
        },
        {
          name: "siteManage",
          path: "site_manage",
          meta: {
            title: "景点管理",
            // role: [1]
          },
          children: [
            {
              name: "siteList",
              path: "site_list",
              component: () => import("@/views/admin/site_manage/index.vue"),
              meta: {
                title: "景点列表"
              },
            }
          ]
        },
      ]
    }
  ],
})



// 可选：全局前置守卫
router.beforeEach((to, from, next) => {
  const store = userStore()
  store.loadUserInfo()
  if (!store.isLogin) {
    console.log(store.isLogin)
    if (to.path !== "/account") {
      return next("/account")
    }
  }
  // 如果存在就执行下一步
  next()
})


export default router
