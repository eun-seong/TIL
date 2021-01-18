import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MarkdownRemarkEdge } from '../graphql-types';
import { mainColor } from '../const';

const POST_LENGTH: number = 10;

interface IProps {
  edges: MarkdownRemarkEdge[];
  fieldValue: string;
}

const Category = styled.h3`
  border-bottom: 0px;
  color: ${mainColor};
  margin: 0 0 0.3rem 0;
`;

const TitleLink = styled(Link)`
  border-bottom: 0px;
  text-decoration: none;
  color: black;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
  margin: 0.1rem 0;
`;

const More = styled.div`
  border-bottom: 0px;
  margin-top: 0.4rem;
`;

const PostList: React.FC<IProps> = ({ edges, fieldValue }) => {
  const edgesVisibleList = edges.slice(0, POST_LENGTH);
  return (
    <>
      <Category>{fieldValue}</Category>

      {edgesVisibleList.map(({ node }, index) => {
        const linkto = fieldValue + '/' + node.frontmatter.path;
        return (
          <div key={index}>
            <TitleLink to={linkto}>{node.frontmatter.title}</TitleLink>
          </div>
        );
      })}

      {edges.length <= POST_LENGTH ? null : (
        <More>
          <TitleLink to={fieldValue}>{'...더보기'}</TitleLink>
        </More>
      )}
      <hr />
    </>
  );
};

export default PostList;
