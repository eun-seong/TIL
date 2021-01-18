import React from 'react';
import styled from 'styled-components';

import Layout from '../components/layout';
import Utterances from '../components/utterances';
import { ITemplateProps } from '../interface';

type IPostListTemplateProps = ITemplateProps<{
  fieldValue: string;
}>;

const Date = styled.div`
  color: #aaa;
  font-size: 0.8rem;
  margin: 1rem 0 3rem 2rem;
`;

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo((props) => {
  const { fieldValue } = props.pageContext;
  console.log(fieldValue);
  return (
    <Layout pageTitle={fieldValue} isPost={true}>
      test
    </Layout>
  );
});

PostListTemplate.displayName = 'PostListTemplate';

export default PostListTemplate;
