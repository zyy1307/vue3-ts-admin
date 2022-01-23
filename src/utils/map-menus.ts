import { IBreadCrumb } from '@/base-ui/breadcrumb/type';
import { RouteRecordRaw } from 'vue-router';

let firstMenu: any = null;

export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  //1、先加载所有routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context('../router/main', true, /\.ts/);
  //路径时相对于context 1st参数
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1]);
    allRoutes.push(route.default);
  });
  //2、取到需要添加的routes
  const _recurGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type == 2) {
        //find(fn)返回数组中第一个符合fn的值
        const route = allRoutes.find((route) => {
          return route.path === menu.url;
        });
        if (route) {
          routes.push(route);
        }
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurGetRoute(menu.children);
      }
    }
  };
  _recurGetRoute(userMenus);
  return routes;
}
//面包屑函数调用下面的pathMapToMenu
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumps: IBreadCrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumps);
  return breadcrumps;
}
//匹配当前url对应的menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumps?: IBreadCrumb[]
): any {
  for (const menu of userMenus) {
    //type===1有子菜单
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        //menu就是父级，没有记录url因为我们这里不可跳转
        breadcrumps?.push({ name: menu.name });
        //findmenu是匹配上的那个menu
        breadcrumps?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]): string[] {
  const permissions: string[] = [];
  //递归
  const _recurGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurGetPermission(userMenus);
  return permissions;
}
//拿取权限菜单的叶子节点
export function getMenuLeafKeys(menuList: any[]) {
  const leafKeys: number[] = [];
  const _recurGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurGetLeaf(menu.children);
      } else {
        leafKeys.push(menu.id);
      }
    }
  };
  _recurGetLeaf(menuList);
  return leafKeys;
}

export { firstMenu };
