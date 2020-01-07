import React from 'react';
import { Link } from '@reach/router';
import { useInitialProps } from '../initial-props';
import { Api, Article } from '../api/interface';
import { Routable } from '../Routable';

interface Params {
  id: string;
}

function getInitialProps(api: Api, { id }: Params): Promise<Article> {
  return api.loadArticle(id);
}

const CmsPage: Routable<Params, Article> = ({ id }: Params) => {
  const article = useInitialProps(api => getInitialProps(api, { id }));

  return (
    <div>
      <span>{article && article.attributes.summary}</span>
      <div>
        <Link to="..">Back</Link>
      </div>
    </div>
  );
};

CmsPage.getInitialProps = getInitialProps;

export default CmsPage;
