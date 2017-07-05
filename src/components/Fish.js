import React from 'react';

import { formatPrice } from './../helpers';

const Fish = (props) => {
  const { details, addToOrder, index } = props;
  const isAvailable = details.status === 'available';
  const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';
  return (
    <li className='menu-fish'>
      <img src={details.image} alt={details.name} />
      <h3 className="details-name">{details.name}
        <span className="price">{formatPrice(details.price)}</span>
      </h3>
      <p>{details.desc}</p>
      <button disabled={!isAvailable} onClick={() => addToOrder(index)}>{buttonText}</button>
    </li>
  );
}

Fish.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  addToOrder: React.PropTypes.func.isRequired
};

export default Fish;
