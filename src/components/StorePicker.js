import React, { Component } from 'react';

import { getFunName } from './../helpers';

class StorePicker extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(e) {
    e.preventDefault();
    // first grab text from the box
    const storeId = this.storeInput.value;
    // then we're going to transition from / to /store/storeId
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className='store-selector' onSubmit={this.goToStore.bind(this)}>
        <h2>Please, Enter a Store</h2>
        <input type='text' placeholder='Store Name' required defaultValue={getFunName()} ref={input => this.storeInput = input} />
        <button type='submit'>Visit Store</button>
      </form>
    );
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
