import { Component } from 'react';
import User from './User';
import UserClass from './UserClass';

class About extends Component {
  constructor(props) {
    super(props);
    console.log('parent constructor');
  }

  componentDidMount() {
    console.log('parent componentDidMount');
  }

  render() {
    console.log('parent render');

    return (
      <div>
        <h1>About Class component</h1>
        <h2>This is the about page</h2>
        {/* <User name="Shrikant" location="Pune" /> */}
        <UserClass name="First" location="Pune" />
        {/* <UserClass name="Second" location="Pune2" /> */}
      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//       <h2>This is the about page</h2>
//       {/* <User name="Shrikant" location="Pune" /> */}
//       <UserClass name="Shrikant(class)" location="Pune" />
//     </div>
//   );
// };

export default About;
