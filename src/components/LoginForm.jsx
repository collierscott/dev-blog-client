import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {renderField} from '../Form/form';
import {requests} from "../agent";

class LoginForm extends Component {
	onSubmit(values) {
		console.log(values);
		return this.props.userLoginAttempt(
			values.username,
			values.password
		)
	};

  render() {
		const {handleSubmit} = this.props;
    return (
      <div className="text-center">
				<form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<div className="form-group">
						<Field name="username" label="Username" type="text" component={renderField} />
						<Field name="password" label="Password" type="password" component={renderField} />
					<button type="submit" className="btn btn-primary btn-block">Submit</button>
					</div>
				</form>
      </div>
    );
  }
}

export const userLoginAttempt = (username, password) => {
	return (dispatch) => {
		return requests.post('/login_check', {username, password})
			.then(
				response => console.log(response)
			).catch(error => {
				console.log("failed")
			})
	}
};

const mapDispatchToProps = {
	userLoginAttempt
};

export default reduxForm({
	form: 'LoginForm'
})(connect(null, mapDispatchToProps)(LoginForm));
