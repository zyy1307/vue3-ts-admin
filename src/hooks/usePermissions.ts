import { useStore } from '@/store';
//页面名、权限名
export function usePermissions(pageName: string, handleName: string) {
  const store = useStore();
  //permissions是此用户拥有的所有权限
  const permissions = store.state.login.permissions;
  //需要验证的是用户数组是否有此页此权限
  const verifyPermission = `system:${pageName}:${handleName}`;
  //!!表示双重取反，目的是获取boolean，find会返回元素值或undefined
  return !!permissions.find((item) => item === verifyPermission);
}
