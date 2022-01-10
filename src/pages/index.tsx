import { formatISO, sub } from 'date-fns';
import { useCallback, useEffect } from 'react';
import CalendarGraph from '../components/CalendarGraph';
import useDailyCommits from '../hooks/useDailyCommits';

// markup
const IndexPage = () => {
  const today = new Date();
  const sinceDate = formatISO(
    sub(today, {
      weeks: 52,
      days: today.getDay(),
    }),
    { representation: 'date' },
  );
  const { data, isLoading } = useDailyCommits({ sinceDate });

  const onCommitClick = useCallback(() => {}, []);

  useEffect(() => {
    if (!isLoading) console.log(data);
  }, [data, isLoading]);

  return (
    <div>
      {!isLoading && data && (
        <CalendarGraph
          onClick={onCommitClick}
          sinceDate={sinceDate}
          data={data.reduce(
            (prev, commit) => ({
              ...prev,
              [commit.date]: prev[commit.date] ? [...prev[commit.date], commit] : [commit],
            }),
            {},
          )}
        />
      )}
    </div>
  );
};

export default IndexPage;
