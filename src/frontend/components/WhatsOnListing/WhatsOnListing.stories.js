import React, { ReactElement } from 'react';
import { Link } from '@reach/router';
import './WhatsOnListing.css';

export default { title: 'Whats on listing' };

export const WhatsOnListing = () => (
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
