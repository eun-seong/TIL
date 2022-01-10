import styled from '@emotion/styled';
import { formatISO, sub } from 'date-fns';
import { Fragment, useCallback, useEffect, useState } from 'react';
import CalendarGraph from '../components/CalendarGraph';
import useCommitDiff from '../hooks/useCommitDiff';
import useDailyCommits from '../hooks/useDailyCommits';

const Contents = styled.div`
  white-space: pre-wrap;
`;

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
  const { fetch, data: diffData } = useCommitDiff();
  const [clickDate, setClickDate] = useState('');

  const onCommitClick = useCallback(({ date, from, to }) => {
    fetch({ from, to });
    setClickDate(date);
  }, []);

  useEffect(() => {
    if (!diffData) return;

    console.log(diffData);
  }, [diffData]);

  useEffect(() => {
    if (!isLoading) console.log(data);
  }, [data, isLoading]);

  return (
    <div>
      {!isLoading && data && (
        <CalendarGraph
          onCommitClick={onCommitClick}
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
      <div>
        {diffData && (
          <Fragment>
            <div>{clickDate}</div>
            {diffData.map((data) => (
              <div>
                <div>{data.filename}</div>
                <Contents>{data.patch}</Contents>
                <br />
              </div>
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
