import styled from '@emotion/styled';

const DiffDocs = ({ filename, patch }) => {
  return (
    <DiffWrapper>
      <FileName>{filename}</FileName>
      <Contents>{patch}</Contents>
    </DiffWrapper>
  );
};

const DiffWrapper = styled.div`
  margin-bottom: 2.2rem;
  border: 1px solid #efefef;
  overflow: hidden;
  border-radius: 6px;
`;

const FileName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  padding: 11px 13px;
  color: #333333;
  background-color: #efefef;
`;

const Contents = styled.div`
  padding: 11px 13px;
  white-space: pre-wrap;
`;
export default DiffDocs;
