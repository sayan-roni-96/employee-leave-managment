import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }))
  }

  const handleRegister = () => {
    const newUser = {
      username: userData.username,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
    }

    // You need to replace the URL with your actual backend endpoint for user registration
    axios
      .post(`${process.env.REACT_APP_LOGIN_BASE_URL}/wp-jwt/v1/create-new-user`, newUser)
      .then((response) => {
        console.log('User registered successfully:', response.data)
        // Optionally handle successful registration - redirect, display success message, etc.
        navigate('/login')
      })
      .catch((error) => {
        console.error('Registration error:', error)
        // Handle registration error - display error message, etc.
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CRow xs={{ gutterX: 6 }}>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="First Name"
                          autoComplete="fname"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Last Name"
                          autoComplete="lname"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="repeatPassword"
                      value={userData.repeatPassword}
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CRow className="mt-3">
                    <CCol xs="6">
                      <CButton color="success" onClick={handleRegister}>
                        Create Account
                      </CButton>
                    </CCol>
                    <CCol xs="6" className="text-right">
                      &nbsp;
                      <p className="account-css text-right">Already have an account &nbsp;</p>
                      <CButton color="link" className="px-2 text-right">
                        <Link to="/login">Sign in</Link>
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
