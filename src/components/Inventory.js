import React, { Component } from 'react';

import base from './../base';
import AddFishForm from './AddFishForm';

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: null,
      owner: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(null, { user });
      }
    })
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // we need to take a copy of this fish and update it
    const updatedFish = Object.assign(fish, {[e.target.name]: e.target.value});
    this.props.updateFish(key, updatedFish);
  }

  authenticate(provider) {
    // console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logOut() {
    base.unauth();
    this.setState({ uid: null, owner: null });
  }

  authHandler(err, authData) {
    // console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    // grab the store info
    const storeRef = base.database().ref(this.props.storeId);
    // console.log('storeRef', storeRef);
    // query the firebase once for store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      // console.log('data-snapshot', data);
      // claim it as our own if there is no owner already
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    })

  }

  renderLogin() {
    return (
      <nav className='login'>
        <h2>Inventory</h2>
        <p>Sign in to manage your store's Inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log in with Twitter</button>
      </nav>
    )
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
    const { uid, owner } = this.state;
    const logout = <button onClick={this.logOut}>Log out!</button>

    // check if user no logged in at all
    if (!uid) {
      return <div>{ this.renderLogin() }</div>
    }

    // check if user is the owner of current store
    if (uid !== owner) {
      return (
        <div>
          <p>Sorry, you aren't owner of this store!!!</p>
          {logout}
        </div>
      );
    }

    return (
      <div>
        <h2>Inventory</h2>
        { logout }
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
  loadSamples: React.PropTypes.func.isRequired,
  // storeId: React.propTypes.string.isRequired
};

export default Inventory;
