import React from 'react';
import { ITemplateProps } from '../interface';
import styled from 'styled-components';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
  date: string;
}>;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: rebeccapurple;
  text-align: center;
`;

const Date = styled.div`
  color: #999;
  font-size: 0.9rem;
  margin-left: 2rem;
`;

const Divider = styled.hr`
  border-bottom: 1px solid #999;
  width: 60%;
  align-self: center;
`;

const PostHeader: React.FC<IPostTemplateProps> = React.memo((props) => {
  const { title, date } = props.pageContext;
  return (
    <Container>
      <Title>{title}</Title>
      <Date>{date}</Date>
      <Divider />
    </Container>
  );
});

PostHeader.displayName = 'PostHeader';

export default PostHeader;
