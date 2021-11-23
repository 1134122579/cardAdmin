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
export const constantRoutes = [{
        path: "/redirect",
        component: Layout,
        hidden: true,
        children: [{
            path: "/redirect/:path(.*)",
            component: () =>
                import ("@/views/redirect/index")
        }]
    },

    {
        path: "/login",
        component: () =>
            import ("@/views/login/index"),
        hidden: true
    },
    {
        path: "/auth-redirect",
        component: () =>
            import ("@/views/login/auth-redirect"),
        hidden: true
    },
    {
        path: "/",
        component: Layout,
        redirect: "/dashboard",
        children: [{
            path: "dashboard",
            component: () =>
                import ("@/views/dashboard/index"),
            name: "Dashboard",
            meta: {
                title: "首页",
                icon: "dashboard",
                affix: true
            }
        }]
    },

    {
        path: "/user",
        component: Layout,
        redirect: "/user",
        name: "user",
        meta: {
            title: "用户管理",
            icon: "user"
        },
        children: [{
                path: "/userList",
                component: () =>
                    import ("@/views/user/list"),
                name: "userList",
                meta: {
                    title: "普通用户",
                    icon: "user"
                }
            },
            {
                path: "/vipUserList",
                component: () =>
                    import ("@/views/user/vipList"),
                name: "vipUserList",
                meta: {
                    title: "会员用户",
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
            title: "会员管理",
            icon: "vip"
        },
        children: [{
                path: "/vipList",
                component: () =>
                    import ("@/views/vip/list"),
                name: "vipList",
                meta: {
                    title: "会员模板",
                    icon: "vip"
                }
            },
            {
                path: "/vipDesc",
                component: () =>
                    import ("@/views/vip/vipDesc"),
                name: "vipDesc",
                meta: {
                    title: "会员兑换",
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
            title: "优惠券管理",
            icon: "vip"
        },
        children: [{
                path: "/couponList",
                component: () =>
                    import ("@/views/vip/list"),
                name: "vipList",
                meta: {
                    title: "优惠券明细",
                    icon: "coupon"
                }
            },
            {
                path: "/vipDesc",
                component: () =>
                    import ("@/views/vip/vipDesc"),
                name: "vipDesc",
                meta: {
                    title: "用户优惠券",
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
            title: "车辆管理",
            icon: "car"
        },
        children: [{
            path: "/carList",
            component: () =>
                import ("@/views/car/list"),
            name: "carList",
            meta: {
                title: "车辆列表",
                icon: "car"
            }
        }]
    },
    {
        path: "/order",
        component: Layout,
        redirect: "/order",
        name: "order",
        meta: {
            title: "订单管理",
            icon: "order"
        },
        children: [{
                path: "/orderList",
                component: () =>
                    import ("@/views/order/vip"),
                name: "orderList",
                meta: {
                    title: "会员订单",
                    icon: "vip"
                }
            },
            {
                path: "/rechargeOrder",
                component: () =>
                    import ("@/views/order/recharge"),
                name: "rechargeOrder",
                meta: {
                    title: "充值订单",
                    icon: "recharge"
                }
            },
            {
                path: "/saleorder",
                component: () =>
                    import ("@/views/order/sale"),
                name: "saleorder",
                meta: {
                    title: "消费订单",
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
            title: "动态管理",
            icon: "acticy"
        },
        children: [{
                path: "/activityList",
                component: () =>
                    import ("@/views/dynamic/activity"),
                name: "activityList",
                meta: {
                    title: "活动介绍",
                    icon: "acticy"
                }
            },
            {
                path: "/newsList",
                component: () =>
                    import ("@/views/dynamic/index"),
                name: "newsList",
                meta: {
                    title: "新闻资讯",
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
            title: "空间管理",
            icon: "place"
        },
        children: [{
                path: "/shopList",
                component: () =>
                    import ("@/views/shop/list"),
                name: "shopList",
                meta: {
                    title: "门店列表",
                    icon: "place"
                }
            },
            {
                path: "/service",
                component: () =>
                    import ("@/views/shop/service"),
                name: "service",
                meta: {
                    title: "服务项目",
                    icon: "task"
                }
            },

        ]
    },
    {
        path: "/banner",
        component: Layout,
        redirect: "/banner",
        name: "banner",
        meta: {
            title: "轮播管理",
            icon: "banner"
        },
        children: [{
            path: "/bannerList",
            component: () =>
                import ("@/views/sysseting/banner"),
            name: "bannerList",
            meta: {
                title: "轮播图列表",
                icon: "banner"
            }
        }, ]
    },

    {
        path: "/seting",
        component: Layout,
        redirect: "/seting",
        name: "set",
        meta: {
            title: "系统设置",
            icon: "set"
        },
        children: [
            // {
            //       path: "create",
            //       component: () =>
            //           import ("@/views/sysseting/add"),
            //       name: "createUser",
            //       meta: {
            //           title: "添加管理员",
            //           icon: "add"
            //       }
            //   },
            {
                path: "edit",
                component: () =>
                    import ("@/views/sysseting/edit"),
                name: "Edit",
                meta: {
                    title: "修改密码",
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
        // base: "/danceadmin", // 加上这一行 测试环境不要加
        routes: constantRoutes
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;