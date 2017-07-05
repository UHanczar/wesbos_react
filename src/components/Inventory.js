import React, { Component } from 'react';

import AddFishForm from './AddFishForm';

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // we need to take a copy of this fish and update it
    const updatedFish = Object.assign(fish, {[e.target.name]: e.target.value});
    this.props.updateFish(key, updatedFish);
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder='Fish Name' onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={fish.price} placeholder='Fish Price' onChange={(e) => this.handleChange(e, key)} />
        <select type="text" name="status" value={fish.status} placeholder='Fish Status' onChange={(e) => this.handleChange(e, key)}>
          <option value='available'>Fresh</option>
          <option value='unavailable'>Sold out!</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc} placeholder='Fish Description' onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder='Fish Image' onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    const { fishes } = this.props;
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
