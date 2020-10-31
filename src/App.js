import React, { Component } from "react";
import "./App.css";

const initialState = {
  fname: "",
  version: "",
  lname: "",
  enterDate: "",
  email: "",
  password: "",
  matchPassword: "",
  fnameError: "",
  versionError: ""
}

class App extends Component {
  state = initialState

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitForm = e => {
    e.preventDefault();
    const showValidation = this.validation();
    if (showValidation) {
      this.setState(initialState)
    }
  };

  validation = () => {
    let fnameError = ""
    let versionError = ""
    let lnameError = ""
    let emailError = ""
    let dateError = ""
    let time = new Date()
    let passwordError = ""
    let matchPasswordError = ""

    if (!this.state.fname) {
      //console.log("fname called");
      fnameError = "First Name can't be blank"
    }
    if (!this.state.version.match(/^(\d+\.)?(\d+\.)?(\*|\d+)$/g)) {
      //console.log("called");
      versionError = "version number not matched"
    }

    if (this.state.lname.length < 4) {
      lnameError = "Last Name should be greater than 4 character";
    }

    if (!this.state.email.includes("@")) {
      emailError = "invalid email"
    }

    let convertedDate =
      time.getFullYear() +
      "-" +
      ("0" + (time.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + (time.getDate() + 1)).slice(-2)
    if(this.state.enterDate.toString() < convertedDate) dateError = "Date should be upcoming"


    if (!(this.state.password.match(/[a-z]/g) &&
        this.state.password.match(/[A-Z]/g) &&
        this.state.password.match(/[0-9]/g) &&
        this.state.password.match(/[^a-zA-Z\d]/g) &&
        this.state.password.length >= 8)) passwordError = "Password must contain atleast one digit, one lowercase, oneUppercase and one special character";


    if (this.state.matchPassword !== this.state.password) matchPasswordError = "Password does not match"

    this.setState({
      emailError,
      fnameError,
      versionError,
      lnameError,
      passwordError,
      dateError,
      matchPasswordError
    })

    if(emailError ||
      fnameError ||
      versionError ||
      lnameError ||
      passwordError ||
      dateError ||
      matchPasswordError)return false
     else return true
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <div>
            <label>First name : </label>
            <input
              type="text"
              name="fname"
              value={this.state.fname}
              onChange={this.changeHandler}
            />
            <div className="error">{this.state.fnameError}</div>
          </div>
          <br />
          <div>
            <label>Last name : </label>
            <input
              type="text"
              name="lname"
              value={this.state.lname}
              onChange={this.changeHandler}
            />
            <div className="error">{this.state.lnameError}</div>
          </div>
          <br />
          <div>
            <label>Date : </label>
            <input
              type="date"
              name="enterDate"
              value={this.state.enterDate}
              onChange={this.changeHandler}
            />
            <div className="error">{this.state.dateError}</div>
          </div>
          <br />
          <div>
            <label>Version : </label>
            <input
              type="text"
              name="version"
              value={this.state.version}
              onChange={this.changeHandler}
            />
            <div className="error">{this.state.versionError}</div>
          </div>
          <br />
          <div>
            <label>Email : </label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.changeHandler}
            />
            <div className="error">{this.state.emailError}</div>
          </div>
          <br />
          <div>
            <label>Password : </label>
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
            <div className="error">{this.state.passwordError}</div>
          </div>
          <br />
          <div>
            <label>Match Password : </label>
            <input
              type="text"
              name="matchPassword"
              value={this.state.matchPassword}
              onChange={this.changeHandler}
            />
            <div className="error">{this.state.matchPasswordError}</div>
          </div>
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
