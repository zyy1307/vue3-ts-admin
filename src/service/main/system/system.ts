import yyRequest from '@/service';
import { IDataType } from '@/service/type';
export function getPageListData(url: string, queryInfo: any) {
  return yyRequest.post<IDataType<any>>({
    url,
    data: queryInfo
  });
}
//url：/users/id
export function deletePageData(url: string) {
  return yyRequest.delete<IDataType>({
    url
  });
}

export function createPageData(url: string, newData: any) {
  return yyRequest.post<IDataType>({
    url,
    data: newData
  });
}
export function editPageData(url: string, editData: any) {
  return yyRequest.patch<IDataType>({
    url,
    data: editData
  });
}
