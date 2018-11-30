import React from "react";
import RegisterForm from "../components/RegisterForm";
import {connect} from "react-redux";
import ConfirmationForm from "../components/ConfirmationForm";
import {userRegisterComplete} from "../actions/userActions";

class RegistrationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counter: 3};
  }

  componentDidUpdate(prevProps, prevState) {
    const {confirmationSuccess, history, userRegisterComplete} = this.props;

    if (prevProps.confirmationSuccess !== confirmationSuccess && confirmationSuccess) {
      this.timer = setInterval(
        () => {
          //console.log(this.state.counter);
          this.setState(prevState => ({counter: prevState.counter - 1}));
        },
        1000
      )
    }

    if (prevState.counter !== this.state.counter && this.state.counter <= 0) {
      userRegisterComplete();
      history.push('login');
    }
  }

  componentWillUnmount() {
    this.props.userRegisterComplete();

    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const {registrationSuccess, confirmationSuccess} = this.props;

    if (!registrationSuccess) {
      return <RegisterForm/>;
    }

    if (!confirmationSuccess) {
      return <ConfirmationForm/>
    }

    return (
      <div className="card mt-3 mb-6 shadow-sm">
        <div className="card-body">
          <h2>Congratulations!</h2>
          <p className="card-text">
            You have confirmed your account. You'll be redirected to login page in&nbsp;
            {this.state.counter} seconds.
          </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.registration
});

const mapDispatchToProps = {
  userRegisterComplete
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);