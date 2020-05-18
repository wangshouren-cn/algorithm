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
    path: '/1',
    name: '一级',
    routes: [
      {
        path: '/1/2',
        name: '二级',
        routes: [],
      },
      {
        path: '/1/2/3',
        name: '三级',
      },
    ],
  },
  {
    path: '/',
    name: 'root',
  },
  {
    path: '/1/2/3',
    name: '三级',
  },
]
function buildMatchRoutesMap(routes) {
  function walkToMap(routes, map) {
    for (let i = 0, r; (r = routes[i++]); ) {
      let { name, path, routes: childRoutes } = r
      if (typeof name === 'string' && typeof path === 'string') {
        path = path.startsWith('/') ? path : '/' + path
        map[path] = {
          name,
          path,
        }
      }
      if (Array.isArray(childRoutes)) {
        walkToMap(childRoutes, map)
      }
    }
  }
  function walkParentToMap(routes, map) {
    for (let i = 0, r; (r = routes[i++]); ) {
      let { name, path, routes: childRoutes } = r
      if (typeof name === 'string' && typeof path === 'string') {
        if (name === '呼叫记录') console.log(path)
        path = path.startsWith('/') ? path : '/' + path
        const currentRoute = map[path]
        const pathGroup = path.split('/')
        for (let i = pathGroup.length - 1; i >= 0; i--) {
          const parentPath = pathGroup.slice(0, i).join('/')
          if (map[parentPath]) {
            currentRoute.parent = map[parentPath]
            break
          }
        }
      }
      if (Array.isArray(childRoutes)) {
        walkParentToMap(childRoutes, map)
      }
    }
  }
  const map = Object.create(null)
  walkToMap(routes, map)
  walkParentToMap(routes, map)
  return map
} /* 
function walk(routes, res = {}) {
  let routesChildren = []
  for (let i = 0, route; (route = routes[i++]); ) {
    let { path, name, routes: childRoutes } = route
    if (typeof path === 'string' && typeof name === 'string') {
      path = path.startsWith('/') ? path : '/' + path
      const newNode = {
        name,
        path,
      }
      if (path === '/' && typeof name === 'string') {
        res['/'] = newNode
        continue
      }
      res[path] = newNode
      const pathGroup = path.split('/')
      let current = newNode
      for (let i = pathGroup.length - 1; i >= 0; i--) {
        if (i === 0) {
          if (res['/'] && res['/'].name) {
            current.father = res['/']
            current = current.father
          }
        } else {
          const currentPath = pathGroup.slice(0, i).join('/')
          if (res[currentPath] && res[currentPath].name) {
            current.father = res[currentPath]
            current = current.father
          }
        }
      }
    }
    if (Array.isArray(childRoutes)) {
      routesChildren.push(childRoutes)
    }
  }
  for (let i = 0, childRoutes; (childRoutes = routesChildren[i++]); ) {
    walk(childRoutes, res)
  }

  return res
} */
const res = buildMatchRoutesMap(routes)
// console.log(JSON.stringify(res))
console.log(JSON.stringify(res))
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
const before = {
  '/statistics': { name: '统计信息', path: '/statistics' },
  '/statistics/call_record': {
    name: '呼叫记录',
    path: '/statistics/call_record',
  },
  '/statistics/call_record/detail/:id': {
    name: '详情',
    path: '/statistics/call_record/detail/:id',
  },
  '/housekeeper': { name: '管家管理', path: '/housekeeper' },
  '/housekeeper/detail/:id': {
    name: '处理详情',
    path: '/housekeeper/detail/:id',
  },
  '/housekeeper/:id': { name: '管家详情', path: '/housekeeper/:id' },
  '/older': { name: '长者管理', path: '/older' },
  '/older/baseinfo/:id/calling/details': {
    name: '呼叫详情',
    path: '/older/baseinfo/:id/calling/details',
  },
  '/older/baseinfo/:id/initinfo': {
    name: '信息查看',
    path: '/older/baseinfo/:id/initinfo',
  },
  '/older/baseinfo/:id/device': {
    name: '服务方案',
    path: '/older/baseinfo/:id/device',
  },
  '/older/baseinfo/:id/calling': {
    name: '呼叫记录',
    path: '/older/baseinfo/:id/calling',
  },
  '/device': { name: '设备管理', path: '/device' },
}

const obj = {
  '/statistics': { name: '统计信息', path: '/statistics' },
  '/statistics/call_record': {
    name: '呼叫记录',
    path: '/statistics/call_record',
    parent: { name: '统计信息', path: '/statistics' },
  },
  '/statistics/call_record/detail/:id': {
    name: '详情',
    path: '/statistics/call_record/detail/:id',
    parent: {
      name: '呼叫记录',
      path: '/statistics/call_record',
      parent: { name: '统计信息', path: '/statistics' },
    },
  },
  '/housekeeper': { name: '管家管理', path: '/housekeeper' },
  '/housekeeper/:id': {
    name: '管家详情',
    path: '/housekeeper/:id',
    parent: { name: '管家管理', path: '/housekeeper' },
  },
  '/housekeeper/detail/:id': {
    name: '处理详情',
    path: '/housekeeper/detail/:id',
    parent: { name: '管家管理', path: '/housekeeper' },
  },
  '/older': { name: '长者管理', path: '/older' },
  '/older/baseinfo/:id/calling/details': {
    name: '呼叫详情',
    path: '/older/baseinfo/:id/calling/details',
    parent: {
      name: '呼叫记录',
      path: '/older/baseinfo/:id/calling',
      parent: { name: '长者管理', path: '/older' },
    },
  },
  '/older/baseinfo/:id/initinfo': {
    name: '信息查看',
    path: '/older/baseinfo/:id/initinfo',
    parent: { name: '长者管理', path: '/older' },
  },
  '/older/baseinfo/:id/device': {
    name: '服务方案',
    path: '/older/baseinfo/:id/device',
    parent: { name: '长者管理', path: '/older' },
  },
  '/older/baseinfo/:id/calling': {
    name: '呼叫记录',
    path: '/older/baseinfo/:id/calling',
    parent: { name: '长者管理', path: '/older' },
  },
  '/device': { name: '设备管理', path: '/device' },
}
