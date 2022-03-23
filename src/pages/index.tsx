import styled from '@emotion/styled';
import { formatISO, sub } from 'date-fns';
import { Fragment, useCallback, useEffect, useState } from 'react';

import CalendarGraph from '../components/CalendarGraph';
import useCommitDiff from '../hooks/useCommitDiff';
import useDailyCommits from '../hooks/useDailyCommits';
import Layout from '../layout';
import { DiffDocs } from '../templates';

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
    <Layout>
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
      {diffData && (
        <Fragment>
          <CommitDate>
            {clickDate
              .split('-')
              .reduce(
                (date, cur, index) =>
                  index === 0 ? `${cur}년 ` : index === 1 ? `${date}${cur}월 ` : `${date}${cur}일`,
                '',
              )}
          </CommitDate>
          {diffData.map((data) => (
            <DiffDocs filename={data.filename} patch={data.patch} />
          ))}
        </Fragment>
      )}
    </Layout>
  );
};

const CommitDate = styled.div`
  padding: 3.5rem 13px 1.4rem 13px;
  font-weight: 700;
  font-size: 1.7rem;
`;

export default IndexPage;
