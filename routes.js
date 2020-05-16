const routes = [
  // 登录
  {
    path: '/login',
    component: '@/pages/Login',
    exact: true,
  },
  {
    path: '/',
    component: '@/layouts/App',
    routes: [
      {
        path: '/',
        component: '@/layouts/ModuleLayout',
        routes: [
          // 统计信息
          {
            name: '统计信息',
            path: '/statistics',
            component: '@/pages/Statistics',
          },
          {
            name: '呼叫记录',
            path: '/statistics/call_record',
            component: '@/pages/Statistics/CallRecord',
          },
          {
            name: '详情',
            path: '/statistics/call_record/detail/:id',
            component: '@/pages/Statistics/CallRecord/Detail',
          },
          {
            path: '/housekeeper',
            component: '@/pages/HouseKeeper/layouts',
            name: '管家管理',
            routes: [
              // 管家管理
              {
                path: '/housekeeper',
                component: '@/pages/Housekeeper',
                name: '管家管理',
                exact: true,
              },
              //管家信息
              {
                path: '/housekeeper/:id',
                component: '@/pages/Housekeeper/HousekeeperInfo',
                name: '管家详情',
                routes: [
                  {
                    path: '/housekeeper/:id/info',
                    component: '@/pages/Housekeeper/HousekeeperInfo/Info',
                    menuName: '信息查看',
                  },
                  {
                    path: '/housekeeper/:id/records',
                    component: '@/pages/Housekeeper/HousekeeperInfo/Records',
                    menuName: '处理记录',
                  },
                  {
                    path: '/housekeeper/detail/:id',
                    component: '@/pages/Housekeeper/HousekeeperInfo/Detail',
                    name: '处理详情',
                  },
                ],
              },
            ],
          },
          //长者管理
          {
            path: '/older',
            component: '@/pages/Older',
            name: '长者管理',
            exact: true,
          },
          {
            path: 'older/baseinfo/:id/calling/details',
            component: '@/pages/Older/BaseInfo/CallServer/CallingDetails',
            name: '呼叫详情',
          },
          {
            path: '/older/baseinfo/:id',
            component: '@/pages/Older/BaseInfo',
            // name: '长者详情',
            routes: [
              {
                path: '/older/baseinfo/:id/initinfo',
                component: '@/pages/Older/BaseInfo/InitInfo',
                name: '信息查看',
              },
              {
                path: '/older/baseinfo/:id/device',
                component: '@/pages/Older/BaseInfo/ServerOffer',
                name: '服务方案',
              },
              // 呼叫记录
              {
                path: '/older/baseinfo/:id/calling',
                component: '@/pages/Older/BaseInfo/CallServer/CallServer',
                name: '呼叫记录',
              },
              //呼叫详情
            ],
          },
          {
            path: '/device',
            component: '@/pages/DeviceManage',
            name: '设备管理',
            exact: true,
          },
        ],
      },
    ],
  },
]

const routes1 = [
  {
    path: '1',
    name: 1,
    routes: [
      {
        path: '2',
        name: 2,
        routes: [
          {
            path: '3',
            name: 3,
          },
        ],
      },
    ],
  },
]
function walk(routes, father, res = {}) {
  routes.forEach(({ path, name, routes }) => {
    const newNode = {
      name,
      father,
    }
    /*   if (typeof name === 'string') {
      res[path] = newNode
    } */

    if (Array.isArray(routes) && routes.length > 0) {
      walk(routes, typeof name === 'string' ? newNode : null, res)
    }
    /* if (typeof path === 'string') {
      const pathGroup = path.split('/').map((s) => (s ? s : ''))
      for (
        let i = pathGroup.length - 2, s;
        i > 0 && (s = pathGroup.slice(0, i++).join('/'));

      ) {}
    } */
  })
  return res
}
const res = walk(routes, null)
// console.log(JSON.stringify(res))
console.log(JSON.stringify(res['older/baseinfo/:id/calling/details']))
/* 
{
  '/older/baseinfo/:id/calling':{
    name:'呼叫记录'
    father:''/older/baseinfo
  }
  '/older/baseinfo/:id/calling':{
    name:'长者详情',
    father:null
  }
}

*/
