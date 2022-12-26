import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    showError: false,
    errorMessage: '',
  }

  enterUsername = event => {
    this.setState({email: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  matchPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  loginUser = async event => {
    const {email, password, confirmPassword} = this.state
    event.preventDefault()
    if (password.length < 6) {
      this.setState({
        errorMessage: 'Password length less than 6',
        showError: true,
      })
    } else if (password !== confirmPassword) {
      this.setState({
        errorMessage: "Passwords didn't match",
        showError: true,
      })
    } else {
      this.setState({
        errorMessage: '',
        showError: false,
        email: '',
        password: '',
        confirmPassword: '',
      })
      const details = {email}
      localStorage.setItem('logDetails', JSON.stringify(details))
      const {history} = this.props
      history.replace('/')
    }
  }

  render() {
    const userLoggedIn = localStorage.getItem('logDetails')

    const {
      email,
      password,
      showError,
      confirmPassword,
      errorMessage,
    } = this.state

    if (userLoggedIn === null) {
      return (
        <div className="page-container">
          <div className="login-page-container">
            <form className="login-form-container" onSubmit={this.loginUser}>
              <div className="website-container ">
                <h1 className="login-heading">Login</h1>
              </div>
              <label htmlFor="username" className="label-element">
                Email
              </label>
              <input
                id="username"
                type="email"
                className="input-element"
                onChange={this.enterUsername}
                value={email}
              />
              <label htmlFor="password" className="label-element">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input-element"
                onChange={this.enterPassword}
                value={password}
              />
              <label htmlFor="confirmPassword" className="label-element">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="input-element"
                onChange={this.matchPassword}
                value={confirmPassword}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {showError ? (
                <p className="error-message">*{errorMessage}</p>
              ) : null}
            </form>
          </div>
        </div>
      )
    }
    return <Redirect to="/" />
  }
}

export default LoginRoute
