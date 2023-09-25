import React from 'react';

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: 'Dummy Name',
        location: 'Default Location',
        avatar_url: 'Dummy photo',
      },
    };
    // console.log(this.props.name, 'child constructor');
  }

  async componentDidMount() {
    // console.log(this.props.name, 'child componentDidMount');
    const data = await fetch('https://api.github.com/users/akshaymarch7');
    const json = await data.json();
    console.log('json: ', json);
    this.setState({
      userInfo: json,
    });
  }

  render() {
    // const { name, location } = this.props;
    const { name, location, avatar_url } = this.state.userInfo;
    // console.log(this.props.name, 'child render');

    return (
      <div className="user-card">
        <img src={avatar_url}></img>
        <h2>Name: {name}</h2>
        <h2>Location: {location}</h2>
        <h2>Contact : shrikant.pawar@gmail.com</h2>
      </div>
    );
  }
}

export default UserClass;
