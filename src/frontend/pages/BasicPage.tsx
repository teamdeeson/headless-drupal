import React from 'react';
import { Link, Redirect } from '@reach/router';
import { useInitialProps } from '../useInitialProps';
import { Api, Tutorial, JsonAPIDocument, JsonAPIEntity, ContentType } from '../api/interface';
import { Routable } from '../Routable';
import TextAndImage from '../components/TextAndImage';
import { find } from '../drupalFields';

interface Params {
  '*': string;
}

function getInitialProps(api: Api, { '*': path }: Params): Promise<JsonAPIDocument<ContentType>> {
  return api.getContentOrRedirectByUrl(path);
}

function Paragraph({ data, included }) {
  switch (data.type) {
    // case 'paragraph--text': {
    // }
    case 'paragraph--text_and_image': {
      return <TextAndImage.fromDrupal data={data} included={included} />;
    }
    // case 'paragraph--slice_links': {
    // }
    default: {
      return <pre>{JSON.stringify(data)}</pre>;
    }
  }
  return null;
}

const BasicPage: Routable<Params, JsonAPIDocument<ContentType>> = ({ '*': path }) => {
  const doc = useInitialProps(api => getInitialProps(api, { '*': path }), [path]);

  // TODO this is how to return a redirect:
  // return <Redirect to="/" />;

  // TODO handle 404s with a server side status.

  if (doc && doc.data.type === 'tutorials') {
    return (
      <>
        <article>
          <h1>{doc.data.attributes.title}</h1>
          {doc.data.relationships.slices.data.map(slice => (
            <Paragraph key={slice.id} data={find(slice.id, doc.included!)} included={doc.included} />
          ))}
        </article>
        <Link to="..">Back</Link>
      </>
    );
  } else if (doc && doc.data.type === 'page') {
    return (
      <>
        <article>
          <h1>{doc.data.attributes.title}</h1>
        </article>
      </>
    );
  }

  return null;
};

BasicPage.getInitialProps = getInitialProps;

export default BasicPage;
