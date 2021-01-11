import React from 'react';
import Layout from '../components/layout';
import Utterances from '../components/utterances';
import { ITemplateProps } from '../interface';

type IPostTemplateProps = ITemplateProps<{
  html: string;
  title: string;
  date: string;
}>;

const PostTemplate: React.FC<IPostTemplateProps> = React.memo((props) => {
  const { title, date, html } = props.pageContext;
  return (
    <Layout>
      <h1>{title}</h1>
      <h4>{date}</h4>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Utterances repo='eun-seong/TIL' />
    </Layout>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
