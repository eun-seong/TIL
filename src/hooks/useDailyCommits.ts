import { formatISO } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { Commit } from '../types';
import useLazyFetch from './useLazyFetch';

const useDailyCommits = ({ sinceDate }) => {
  const { fetch: lazyFetch, data: fetchingData, error } = useLazyFetch<Commit[]>();
  const [isLoading, setIsLoading] = useState(true);
  const countPage = useRef(1);
  const data = useRef<Commit[]>([]);

  const options = {
    url: `/${process.env.GATSBY_AUTHOR}/${process.env.GATSBY_REPO}/commits`,
    params: {
      per_page: 100,
      since: `${sinceDate}T00:00:00+09:00`,
    },
    transformResponse: (res: string) =>
      JSON.parse(res)
        .reverse()
        .reduce(
          (prev: Commit[], cur) => [
            ...prev,
            {
              prevSha: prev.length ? prev[prev.length - 1].sha : null,
              sha: cur.sha,
              date: formatISO(new Date(cur.commit.committer.date), { representation: 'date' }),
            },
          ],
          [],
        ),
  };

  useEffect(() => {
    lazyFetch({ ...options, params: { ...options.params, page: countPage.current++ } });
  }, []);

  useEffect(() => {
    if (!fetchingData) return;

    if (!fetchingData.length) {
      setIsLoading(false);
      return;
    }

    data.current = data.current.concat(fetchingData);
    lazyFetch({ ...options, params: { ...options.params, page: countPage.current++ } });
  }, [fetchingData]);

  return {
    data: data.current,
    isLoading,
    error,
  };
};

export default useDailyCommits;
