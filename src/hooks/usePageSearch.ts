import PageContent from '@/components/page-content';
import { ref } from 'vue';

export function usePageSearch() {
  //用到ref要return！！！老是忘记！！
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const handleQuery = (queryInfo: any) => {
    console.log(queryInfo.value);

    pageContentRef.value?.getPageData(queryInfo);
  };
  const handleReset = () => {
    pageContentRef.value?.getPageData();
  };
  return {
    pageContentRef,
    handleQuery,
    handleReset
  };
}
