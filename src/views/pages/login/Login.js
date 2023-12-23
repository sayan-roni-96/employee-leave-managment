import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios' // Don't forget to import axios

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
    // Clear the error message when typing in the input fields
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const validateLoginForm = () => {
    const { userName, password } = credentials
    const errors = {}

    if (!userName.trim()) {
      errors.userName = 'Username is required'
    }

    if (!password.trim()) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long'
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLogin = () => {
    const isValid = validateLoginForm()
    if (isValid) {
      const userData = {
        username: credentials.userName,
        password: credentials.password,
      }
      axios
        .post(`${process.env.REACT_APP_LOGIN_BASE_URL}/jwt-auth/v1/token`, userData)
        .then((resp) => {
          console.log('resp =>', resp)
          if (resp.status === 200) {
            console.log('User added successfully.')

            localStorage.setItem('userdata', JSON.stringify(resp.data))
            setCredentials({
              userName: '',
              password: '',
            })
            window.location.reload()
          }
        })
        .catch((err) => {
          console.error('save_error =>', err)
        })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        name="userName"
                        value={credentials.userName}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    {errors.userName && <div className="text-danger">{errors.userName}</div>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                      />
                      <CInputGroupText onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </CInputGroupText>
                    </CInputGroup>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                    <CButton color="primary" className="px-4" onClick={handleLogin}>
                      Login
                    </CButton>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
