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
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
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
  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const navigate = useNavigate()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false)

  const validateForm = () => {
    const errors = {}

    // Validating username
    if (!userData.username.trim()) {
      errors.username = 'Username is required'
    }

    // Validating first name
    if (!userData.firstName.trim()) {
      errors.firstName = 'First name is required'
    }

    // Validating last name
    if (!userData.lastName.trim()) {
      errors.lastName = 'Last name is required'
    }

    // Validating email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!userData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!emailPattern.test(userData.email)) {
      errors.email = 'Invalid email format'
    }

    // Validating password
    if (!userData.password) {
      errors.password = 'Password is required'
    } else if (userData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long'
    }

    // Validating repeat password
    if (!userData.repeatPassword) {
      errors.repeatPassword = 'Repeat password is required'
    } else if (userData.repeatPassword !== userData.password) {
      errors.repeatPassword = 'Passwords do not match'
    }

    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }))
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const toggleRepeatPasswordVisibility = () => {
    setIsRepeatPasswordVisible(!isRepeatPasswordVisible)
  }

  const handleBlur = (field) => {
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }))
  }

  const handleRegister = () => {
    const isValid = validateForm()
    if (isValid) {
      const newUser = {
        username: userData.username,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
      }

      // Replace the URL with your actual backend endpoint for user registration
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
                      onBlur={() => handleBlur('username')}
                    />
                  </CInputGroup>
                  {touchedFields.username && errors.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
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
                          onBlur={() => handleBlur('firstName')}
                        />
                      </CInputGroup>
                      {touchedFields.firstName && errors.firstName && (
                        <div className="text-danger">{errors.firstName}</div>
                      )}
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
                          onBlur={() => handleBlur('lastName')}
                        />
                      </CInputGroup>
                      {touchedFields.lastName && errors.lastName && (
                        <div className="text-danger">{errors.lastName}</div>
                      )}
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
                      onBlur={() => handleBlur('email')}
                    />
                  </CInputGroup>
                  {touchedFields.email && errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('password')}
                    />
                    <CInputGroupText onClick={togglePasswordVisibility}>
                      {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </CInputGroupText>
                  </CInputGroup>
                  {touchedFields.password && errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={isRepeatPasswordVisible ? 'text' : 'password'}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name="repeatPassword"
                      value={userData.repeatPassword}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('repeatPassword')}
                    />
                    <CInputGroupText onClick={toggleRepeatPasswordVisibility}>
                      {isRepeatPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </CInputGroupText>
                  </CInputGroup>
                  {touchedFields.repeatPassword && errors.repeatPassword && (
                    <div className="text-danger">{errors.repeatPassword}</div>
                  )}
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
