import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {renderField} from '../Form/form';
import {userLoginAttempt, userLoginSuccess} from '../actions/userActions';

class LoginForm extends Component {
	componentDidUpdate(prevProps) {
		if(prevProps.token !== this.props.token) {
			this.props.history.push('/');
		}
	}

	onSubmit(values) {
		console.log(values);
		return this.props.userLoginAttempt(
			values.username,
			values.password
		)
	};

  render() {
		const {handleSubmit, error} = this.props;

    return (
      <div className="text-center">
				{error && <div className="alert alert-danger">{error}</div>}
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

const mapStateToProps = state => ({
	...state.auth
});

const mapDispatchToProps = {
	userLoginAttempt,
	userLoginSuccess,
};

export default reduxForm({
	form: 'LoginForm'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
