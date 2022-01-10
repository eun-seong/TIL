import { formatISO, sub } from 'date-fns';
import { useEffect } from 'react';
import CalendarGraph from '../components/CalendarGraph';
import useDailyCommits from '../hooks/useDailyCommits';
import { Commit } from '../types';

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

  useEffect(() => {
    if (!isLoading) console.log(data);
  }, [data, isLoading]);

  useEffect(() => {
    console.log(process.env.GATSBY_GITHUB_TOKEN);
  }, []);

  return (
    <div>
      {!isLoading && data && (
        <CalendarGraph
          sinceDate={sinceDate}
          data={data.reduce(
            (prev, commit) =>
              prev[prev.length - 1].slice(0, 10) === commit.date.slice(0, 10)
                ? prev
                : [...prev, commit.date.slice(0, 10)],
            [data[0].date.slice(0, 10)],
          )}
        />
      )}
    </div>
  );
};

export default IndexPage;
