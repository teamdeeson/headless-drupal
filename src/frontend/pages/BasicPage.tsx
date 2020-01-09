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
  return api.loadContent(id);
}

// Renders paragraphs.
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

const BasicPage: Routable<Params, JsonAPIDocument<Tutorial>> = ({ id }: Params) => {

  const doc = useInitialProps(api => getInitialProps(api, { id }));

  if (doc) {
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
  }

  return <span>should be allowed null return here</span>;
};

BasicPage.getInitialProps = getInitialProps;

export default BasicPage;

function find(id: string, included: JsonAPIEntity[]) {
  return included.find(i => i.id === id);
}
