import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class HomeRoute extends Component {
  state = {
    userName: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    showError: false,
    uploadedImage: '',
  }

  changeUserName = event => {
    this.setState({userName: event.target.value})
  }

  changePhoneNumber = event => {
    this.setState({phoneNumber: event.target.value})
  }

  changeAddress = event => {
    this.setState({address: event.target.value})
  }

  changeDOB = event => {
    this.setState({dateOfBirth: event.target.value})
  }

  loginUserDetails = event => {
    event.preventDefault()
    const {userName} = this.state
    if (userName === '') {
      return this.setState({showError: true})
    }
    this.setState({showError: false})
    const {history} = this.props
    return history.replace('/game')
  }

  skipDetails = () => {
    const {history} = this.props
    history.replace('/game')
  }

  setProfileImage = () => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      console.log(reader.result)
      this.setState({uploadedImage: reader.result})
    })
    // eslint-disable-next-line prefer-destructuring
    reader.readAsDataURL(File)
  }

  render() {
    const {
      userName,
      phoneNumber,
      dateOfBirth,
      address,
      showError,
      uploadedImage,
    } = this.state
    // const bgImage = `background-image:url(${uploadedImage})`
    const userLoggedIn = localStorage.getItem('logDetails')
    if (userLoggedIn !== null) {
      return (
        <form className="login-form-container" onSubmit={this.loginUserDetails}>
          <div className="website-container ">
            <p className="login-heading">You have successfully Logged In!</p>
          </div>
          <input
            type="file"
            accept="image/png, image/jpg"
            onChange={this.setProfileImage}
          />
          <img src={uploadedImage} alt="Profile" />

          <label htmlFor="username" className="label-element">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="input-element"
            onChange={this.changeUserName}
            value={userName}
          />

          <label htmlFor="address" className="label-element">
            Address
          </label>
          <input
            id="address"
            type="text"
            className="input-element"
            onChange={this.changeAddress}
            value={address}
          />

          <label htmlFor="dateOfBirth" className="label-element">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className="input-element"
            onChange={this.changeDOB}
            value={dateOfBirth}
          />

          <label htmlFor="phoneNumber" className="label-element">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            className="input-element"
            onChange={this.changePhoneNumber}
            value={phoneNumber}
          />
          <button type="submit" className="login-button">
            Finish
          </button>
          {showError ? (
            <p className="error-message">*Enter Valid UserName</p>
          ) : null}
          <button
            type="button"
            onClick={this.skipDetails}
            className="skip-button "
          >
            Skip
          </button>
        </form>
      )
    }
    return <Redirect to="/login" />
  }
}

export default HomeRoute
