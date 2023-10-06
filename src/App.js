import React, { useState, useEffect, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
//Providing store to react application is react job hence the below import
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Error from './components/Error';
import Body from './components/Body';
import Contact from './components/Contact';
import RestaurantMenu from './components/RestaurantMenu';
import UserContext from './utils/userContext';
import appStore from './utils/appStore';
import Cart from './components/Cart';

//import is not the standard import function
const Grocery = lazy(() => import('./components/Grocery'));
const About = lazy(() => import('./components/About'));

// React.createElement => ReactElement(Object) => render => HTMLElement

// const heading = React.createElement('h1', {id: 'heading'}, 'Namaste React')

// //JS doesn't understand JSX(try running in console)
// //JS code is transpiled(by babel) before it reaches JS engine
// const jsxHeading = <h1>JSX code</h1> //React Element

// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(heading) //root.renders always renders an element

//Rendering react functional component

// const Title = () => (
//   <h1 className='head'>title element in react</h1>
// )
// const HeadingComponent = () => (
//   <div id='container'>
//     {/* Below 3 ways are doin the same thing */}
//     <Title />
//     <Title></Title>
//     {Title()}
//     <h1>Heading component as react compnent</h1>
//   </div>
// )
// const root2 = ReactDOM.createRoot(document.getElementById('root'))
// // root2.render(HeadingComponent())
// root2.render(<HeadingComponent/>)

// no key (not acceptable)<<<<<<<<<<< index key(last option) <<<<< unquie key (best practice)
const AppLayout = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    const data = { name: 'Shrikant P' };
    setUsername(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: username, setUsername }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: '/restaurants/:resId',
        element: <RestaurantMenu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root2 = ReactDOM.createRoot(document.getElementById('root'));
root2.render(<RouterProvider router={appRouter}></RouterProvider>);
