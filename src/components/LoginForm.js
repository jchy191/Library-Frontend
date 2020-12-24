import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ show, setToken, setPage }) => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [login, result] = useMutation(LOGIN);

	useEffect(() => {
		if (result.data) {
			console.log(result.data);
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem('user-token', token);
			setPage('authors');
		}
	}, [result.data]);

	const submit = (event) => {
		event.preventDefault();
		login({ variables: { username, password } });
	};

	if (!show) {
		return null;
	}

	return (
		<form onSubmit={submit}>
			<div>
          username
				<input
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
          password
				<input
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>Login</button>
		</form>
	);
};

LoginForm.propTypes = {
	show: PropTypes.bool.isRequired,
	setToken: PropTypes.func.isRequired,
	setPage: PropTypes.func.isRequired,
};

export default LoginForm;