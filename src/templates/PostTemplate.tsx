import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import Utterances from '../components/utterances';
import { ITemplateProps } from '../interface';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
  date: string;
  category: string;
}>;

const Date = styled.div`
  color: #aaa;
  font-size: 0.8rem;
  margin-left: 2rem;
`;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo((props) => {
  const { title, html, date } = props.pageContext;
  console.log(html);
  return (
    <Layout pageTitle={title} isPost={true}>
      <Date>{date}</Date>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Utterances repo='eun-seong/TIL' />
    </Layout>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
