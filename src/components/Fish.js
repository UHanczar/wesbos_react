import React from 'react';

import { formatPrice } from './../helpers';

const Fish = (props) => {
  const { details } = props;
  return (
    <li className='menu-fish'>
      <img src={details.image} alt={details.name} />
      <h3 className="details-name">{details.name}
        <span className="price">{formatPrice(details.price)}</span>
      </h3>
      <p>{details.desc}</p>
      <button>Add to Order</button>
    </li>
  );
}

export default Fish;
