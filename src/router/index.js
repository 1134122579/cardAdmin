import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import userRouter from './modules/user'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index")
      }
    ]
  },

  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: {
          title: "??????",
          icon: "dashboard",
          affix: true
        }
      }
    ]
  },

  {
    path: "/user",
    component: Layout,
    redirect: "/user",
    name: "user",
    meta: {
      title: "????????????",
      icon: "user"
    },
    children: [
      {
        path: "/userList",
        component: () => import("@/views/user/list"),
        name: "userList",
        meta: {
          title: "????????????",
          icon: "user"
        }
      },
      {
        path: "/vipUserList",
        component: () => import("@/views/user/vipList"),
        name: "vipUserList",
        meta: {
          title: "????????????",
          icon: "vip"
        }
      }
    ]
  },
  {
    path: "/vip",
    component: Layout,
    redirect: "/vip",
    name: "vip",
    meta: {
      title: "????????????",
      icon: "vip"
    },
    children: [
      {
        path: "/vipList",
        component: () => import("@/views/vip/list"),
        name: "vipList",
        meta: {
          title: "????????????",
          icon: "vip"
        }
      },
      {
        path: "/vipDesc",
        component: () => import("@/views/vip/vipDesc"),
        name: "vipDesc",
        meta: {
          title: "????????????",
          icon: "vipdesc"
        }
      }
    ]
  },
  {
    path: "/coupon",
    component: Layout,
    redirect: "/coupon",
    name: "coupon",
    meta: {
      title: "???????????????",
      icon: "vip"
    },
    children: [
      {
        path: "/couponList",
        component: () => import("@/views/couponList/couponList"),
        name: "vipList",
        meta: {
          title: "???????????????",
          icon: "coupon"
        }
      },
      {
        path: "/uservipcardList",
        component: () => import("@/views/couponList/uservipcardList"),
        name: "uservipcardList",
        meta: {
          title: "???????????????",
          icon: "vipdesc"
        }
      },
      {
        path: "/usercouponList",
        component: () => import("@/views/couponList/usercouponList"),
        name: "vipDesc",
        meta: {
          title: "???????????????",
          icon: "vipdesc"
        }
      }
    ]
  },
  {
    path: "/car",
    component: Layout,
    redirect: "/car",
    name: "car",
    meta: {
      title: "????????????",
      icon: "car"
    },
    children: [
      {
        path: "/carList",
        component: () => import("@/views/car/list"),
        name: "carList",
        meta: {
          title: "????????????",
          icon: "car"
        }
      }
    ]
  },
  {
    path: "/order",
    component: Layout,
    redirect: "/order",
    name: "order",
    meta: {
      title: "????????????",
      icon: "order"
    },
    children: [
      {
        path: "/orderList",
        component: () => import("@/views/order/vip"),
        name: "orderList",
        meta: {
          title: "????????????",
          icon: "vip"
        }
      },
      {
        path: "/rechargeOrder",
        component: () => import("@/views/order/recharge"),
        name: "rechargeOrder",
        meta: {
          title: "????????????",
          icon: "recharge"
        }
      },
      {
        path: "/saleorder",
        component: () => import("@/views/order/sale"),
        name: "saleorder",
        meta: {
          title: "????????????",
          icon: "sall"
        }
      }
    ]
  },
  {
    path: "/dynamic",
    component: Layout,
    redirect: "/dynamic",
    name: "data",
    meta: {
      title: "????????????",
      icon: "acticy"
    },
    children: [
      {
        path: "/activityList",
        component: () => import("@/views/dynamic/activity"),
        name: "activityList",
        meta: {
          title: "????????????",
          icon: "acticy"
        }
      },
      {
        path: "/dynamic",
        component: () => import("@/views/dynamic/index"),
        name: "dynamic",
        meta: {
          title: "????????????",
          icon: "news"
        }
      }
    ]
  },
  {
    path: "/shop",
    component: Layout,
    redirect: "/shop",
    name: "shop",
    meta: {
      title: "????????????",
      icon: "place"
    },
    children: [
      {
        path: "/shopList",
        component: () => import("@/views/shop/list"),
        name: "shopList",
        meta: {
          title: "????????????",
          icon: "place"
        }
      },
      {
        path: "/service",
        component: () => import("@/views/shop/service"),
        name: "service",
        meta: {
          title: "????????????",
          icon: "task"
        }
      }
    ]
  },
  {
    path: "/banner",
    component: Layout,
    redirect: "/banner",
    name: "banner",
    meta: {
      title: "????????????",
      icon: "banner"
    },
    children: [
      {
        path: "/bannerList",
        component: () => import("@/views/sysseting/banner"),
        name: "bannerList",
        meta: {
          title: "???????????????",
          icon: "banner"
        }
      }
    ]
  },

  {
    path: "/seting",
    component: Layout,
    redirect: "/seting",
    name: "set",
    meta: {
      title: "????????????",
      icon: "set"
    },
    children: [
      // {
      //       path: "create",
      //       component: () =>
      //           import ("@/views/sysseting/add"),
      //       name: "createUser",
      //       meta: {
      //           title: "???????????????",
      //           icon: "add"
      //       }
      //   },
      {
        path: "edit",
        component: () => import("@/views/sysseting/edit"),
        name: "Edit",
        meta: {
          title: "????????????",
          icon: "edit"
        }
      }
    ]
  },
  {
    path: "*",
    redirect: "/",
    hidden: true
  }
];
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  // {
  //     path: "*",
  //     redirect: "/404",
  //     hidden: true
  // }
];

const createRouter = () =>
  new Router({
    // require service support
    mode: "history",
    scrollBehavior: () => ({
      y: 0
    }),
    // base: "/danceadmin", // ??????????????? ?????????????????????
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
