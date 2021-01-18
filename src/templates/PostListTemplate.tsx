import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { Query, MarkdownRemarkEdge } from '../graphql-types';

import Layout from '../components/layout';
import { ITemplateProps } from '../interface';
import PostCard from '../components/PostCard';

type IPostListTemplateProps = ITemplateProps<{
  fieldValue: string;
  edges: MarkdownRemarkEdge[];
}>;

const Date = styled.div`
  color: #aaa;
  font-size: 0.8rem;
  margin: 1rem 0 3rem 2rem;
`;

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo((props) => {
  const { edges, fieldValue } = props.pageContext;
  console.log(fieldValue, edges);
  return (
    <Layout pageTitle={fieldValue} isPost={false}>
      {edges.map(({ node }, index) => (
        <PostCard node={node} key={index} />
      ))}
    </Layout>
  );
});

PostListTemplate.displayName = 'PostListTemplate';

export default PostListTemplate;
