import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: !!localStorage.getItem('userdata'),
    }
  }
  render() {
    const { isAuthenticated } = this.state

    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            {isAuthenticated ? (
              <Route path="*" element={<DefaultLayout />} />
            ) : (
              <>
                <Route exact path="/login" name="Login Page" element={<Login />} />
                <Route exact path="/register" name="Register Page" element={<Register />} />
                <Route path="*" element={<Login />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
