import { CommitDiff } from '@src/types';
import useLazyFetch from './useLazyFetch';

const useCommitDiff = () => {
  const { fetch: lazyFetch, data, isLoading, error } = useLazyFetch<CommitDiff[]>();

  return {
    fetch: ({ from, to }: { from: string; to: string }) =>
      lazyFetch({
        url: `/${process.env.GATSBY_AUTHOR}/${process.env.GATSBY_REPO}/compare/${from}...${to}`,
        transformResponse: (res) =>
          JSON.parse(res)
            .files.filter((file) => !!file.filename.match(/^contents/))
            .map((file) => ({
              sha: file.sha,
              filename: file.filename,
              status: file.status,
              patch: file.patch,
            })),
      }),
    data,
    isLoading,
    error,
  };
};

export default useCommitDiff;
