import React from 'react';
import { Link } from '@reach/router';
import { useInitialProps } from '../useInitialProps';
import { Api, JsonAPIDocument, ContentType, Paragrah } from '../api/interface';
import { Routable } from '../Routable';
import TextAndImage from '../components/TextAndImage';
import { find } from '../drupalFields';
import drupalTextAndImage from '../components/TextAndImage/drupalTextAndImage';

interface Params {
  '*': string;
}

function getInitialProps(api: Api, { '*': path }: Params): Promise<JsonAPIDocument<ContentType>> {
  return api.getContentOrRedirectByUrl(path);
}

function Paragraph({ data, doc }: { data: Paragrah; doc: JsonAPIDocument<ContentType> }) {
  switch (data.type) {
    case 'paragraph--image_text': {
      return <TextAndImage {...drupalTextAndImage(data, doc)} />;
    }
    default: {
      return <pre>{JSON.stringify(data)}</pre>;
    }
  }
}

const BasicPage: Routable<Params, JsonAPIDocument<ContentType>> = ({ '*': path }) => {
  const doc = useInitialProps(api => getInitialProps(api, { '*': path }), [path]);

  // TODO this is how to return a redirect:
  // return <Redirect to="/" />;

  // TODO handle 404s with a server side status.

  if (doc && doc.data.type === 'articles') {
    return (
      <>
        <article>
          <h1>{doc.data.attributes.title}</h1>
          {doc.data.relationships.slices.data.map(slice => (
            <Paragraph key={slice.id} data={find(slice, doc.included)} doc={doc} />
          ))}
        </article>
        <Link to="/articles">Back</Link>
      </>
    );
  }
  return <div>Only rendering articles at this time</div>;
};

BasicPage.getInitialProps = getInitialProps;

export default BasicPage;
