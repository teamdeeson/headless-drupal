import React, { ReactElement } from 'react';
import { Link } from '@reach/router';
import './whatsOnListing.css';

const WhatsOnListing = (): ReactElement => (
  <ul>
    <li>This will be the whats on listing</li>
    <li>
      <Link to="1">Entry 1</Link>
    </li>
    <li>
      <Link to="2">Entry 2</Link>
    </li>
    <li>
      <Link to="3">Entry 3</Link>
    </li>
  </ul>
);
export default WhatsOnListing;
