import React, { Component } from 'react';

import base from './../base'

import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from './../sample-fishes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fishes: {},
      order: {}
    };

    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
  }

  componentWillMount() {
    // we can check state not only firebase database, but...
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    // ...but our localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // then update our App component
      this.setState({
        order: JSON.parse(localStorageRef, undefined, 2)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('Something changed', nextProps, nextState);
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

  addFish(fish) {
    // update our state
    const fishes = {...this.state.fishes};
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    // set state
    this.setState({
      fishes
    });
  }

  updateFish(key, updatedFish) {
    const { fishes } = this.state;
    fishes[key] = updatedFish;
    this.setState({
      fishes
    });
  }

  removeFish(key) {
    const {fishes} = {...this.state};
    fishes[key] = null;
    this.setState({
      fishes
    });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // first, take a copy of our state
    const order = {...this.state.order};
    // add new number of fish
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({
      order
    });
  }

  removeFromOrder(key) {
    const { order } = {...this.state};
    delete order[key];
    this.setState({
      order
    });
  }

  render() {
    const { fishes, order } = this.state;
    return (
      <div className='catch-of-the-day'>
        <div className='menu'>
          <Header tagline='Fresh Seafood Market' />
          <ul className="list-of-fishes">
            {Object.keys(fishes).map(fishId => <Fish key={fishId} index={fishId} details={fishes[fishId]} addToOrder={this.addToOrder} />)}
          </ul>
        </div>
        <Order
          fishes={fishes}
          order={order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />

        <Inventory
          fishes={fishes}
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
        />
      </div>
    );
  }
}

export default App;
