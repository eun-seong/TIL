import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { MarkdownRemarkEdge } from '../graphql-types';
import { mainColor } from '../const';

interface IProps {
  edges: MarkdownRemarkEdge[];
  fieldValue: string;
}

const Category = styled(Link)`
  border-bottom: 0px;
  color: ${mainColor};
  margin: 0 0 0.5rem 0;
`;

const TitleLink = styled(Link)`
  display: block;
  border-bottom: 0px;
  text-decoration: none;
  color: black;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.7;
  }
  margin: 0.1rem 0;
`;

const PostCard: React.FC<IProps> = ({ edges, fieldValue }) => {
  return (
    <>
      <Category to={fieldValue}>{fieldValue}</Category>
      {edges.map(({ node }, id) => {
        const linkto = fieldValue + '/' + node.frontmatter.path;
        return <TitleLink to={linkto}>{node.frontmatter.title}</TitleLink>;
      })}
      <hr />
    </>
  );
};

export default PostCard;
