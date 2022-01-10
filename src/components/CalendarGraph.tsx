import styled from '@emotion/styled';
import { formatISO, add } from 'date-fns';

const WEEK_NUM = 52;

const GraphContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 10px;
  width: fit-content;
`;

const Rect = styled.rect<{ isCommitted: boolean }>`
  fill: ${({ isCommitted }) => (isCommitted ? 'tomato' : '#eeeeee')};
  :hover {
    cursor: pointer;
  }
`;

const CommitRect = ({ day, commitDate, isCommitted }) => (
  <Rect data-date={commitDate} width={11} height={11} y={day * 15} rx={2} ry={2} isCommitted={isCommitted} />
);

const CalendarGraph = ({ data, sinceDate }: { sinceDate: string; data: string[] }) => {
  const today = new Date();
  const since = new Date(sinceDate);
  let count = 0;
  console.log(since, sinceDate, data, count);

  const WeekCommit = (length: number, week: number) =>
    Array.from({ length }).map((_, day) => {
      const commitDate = formatISO(
        add(since, {
          days: count,
        }),
        { representation: 'date' },
      );
      const isCommitted = !!data.find((date) => {
        return date === commitDate;
      });
      count += 1;
      return <CommitRect key={`${week}-${day}`} day={day} commitDate={commitDate} isCommitted={isCommitted} />;
    });

  return (
    <GraphContainer>
      <svg width={(WEEK_NUM + 1) * 16 - 5} height={6 * 15 + 11}>
        <g>
          {Array.from({ length: WEEK_NUM }).map((_, week) => (
            <g key={week} transform={`translate(${week * 16}, 0)`}>
              {WeekCommit(7, week)}
            </g>
          ))}
          <g transform={`translate(${WEEK_NUM * 16}, 0)`}>{WeekCommit(today.getDay() + 1, WEEK_NUM)}</g>
        </g>
      </svg>
    </GraphContainer>
  );
};

export default CalendarGraph;
