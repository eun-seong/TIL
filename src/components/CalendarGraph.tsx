import styled from '@emotion/styled';
import { formatISO, add } from 'date-fns';
import { Commit } from '../types';

interface Props {
  onCommitClick: ({ date, from, to }: { date: string; from: string; to: string }) => void;
  sinceDate: string;
  data: { [key: string]: Commit[] };
}

const WEEK_NUM = 52;

const GraphContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 13px 11px;
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

const CalendarGraph = ({ onCommitClick, data, sinceDate }: Props) => {
  let count = 0;

  const WeekCommit = (length: number, week: number) =>
    Array.from({ length }).map((_, day) => {
      const commitDate = formatISO(
        add(new Date(sinceDate), {
          days: count,
        }),
        { representation: 'date' },
      );
      const isCommitted = !!Object.keys(data).find((date) => {
        return date === commitDate;
      });
      count += 1;
      return <CommitRect key={`${week}-${day}`} day={day} commitDate={commitDate} isCommitted={isCommitted} />;
    });
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { date } = (e.target as SVGElement).dataset;
    if (!date || !data[date]) return;
    onCommitClick({ date: date, from: data[date][0].prevSha, to: data[date][data[date].length - 1].sha });
  };

  return (
    <GraphContainer onClick={onClick}>
      <svg width={(WEEK_NUM + 1) * 15 - 4} height={7 * 15 - 4}>
        <g>
          {Array.from({ length: WEEK_NUM }).map((_, week) => (
            <g key={week} transform={`translate(${week * 15}, 0)`}>
              {WeekCommit(7, week)}
            </g>
          ))}
          <g transform={`translate(${WEEK_NUM * 15}, 0)`}>{WeekCommit(new Date().getDay() + 1, WEEK_NUM)}</g>
        </g>
      </svg>
    </GraphContainer>
  );
};

export default CalendarGraph;
