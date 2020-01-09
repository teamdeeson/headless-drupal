import React from 'react';
import { Link } from '@reach/router';
import { useInitialProps } from '../initial-props';
import { Api, Tutorial, JsonAPIDocument, JsonAPIEntity } from '../api/interface';
import { Routable } from '../Routable';
import TextAndImage from '../components/TextAndImage';

interface Params {
  id: string;
}

function getInitialProps(api: Api, { id }: Params): Promise<JsonAPIDocument<Tutorial>> {
  return api.loadArticle(id);
}

// Renders paragraphs.
function Paragraph({ data, included }) {
  switch (data.type) {
    // case 'paragraph--text': {
    // }
    case 'paragraph--image_text': {
      return <TextAndImage.fromDrupal data={data} inclued={included} />;
    }
    // case 'paragraph--content_links': {
    // }
    default: {
      return <pre>{JSON.stringify(data)}</pre>;
    }
  }
  return null;
}

const CmsPage: Routable<Params, JsonAPIDocument<Tutorial>> = ({ id }: Params) => {
  const doc = useInitialProps(api => getInitialProps(api, { id }));
  if (doc) {
    return (
      <>
        <article>
          <h1>{doc.data.attributes.title}</h1>
          <p>{doc && doc.data.attributes.summary}</p>
          {doc.data.relationships.slices.data.map(slice => (
            <Paragraph key={slice.id} data={find(slice.id, doc.included!)} included={doc.included} />
          ))}
        </article>
        <Link to="..">Back</Link>
      </>
    );
  }
  return <span>should be allowed null return here</span>;
};

CmsPage.getInitialProps = getInitialProps;

export default CmsPage;

function find(id: string, included: JsonAPIEntity[]) {
  return included.find(i => i.id === id);
}
