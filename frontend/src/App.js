import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes } from '~/router';
import { DefaultLayout } from '~/Layout';
import { Fragment } from 'react';
function App() {
  return (
    <Router>
      <div className='app'>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.components
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            }
            else if (route.layout === null) {
              Layout = Fragment
            }
            return <Route key={index} path={route.path} element={
              <Layout>
                <Page />

              </Layout>
            } />
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
