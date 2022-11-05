import type {FormEvent} from 'react';
import {useState} from 'react';
import css from './form.module.css';
import {Input} from '@components/input/Input';
import {Button} from '@components/button/Button';
import {Checkbox} from '@components/checkbox/Checkbox';

export function Form() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(true);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
	}

	return (
		<form className={css.form} onSubmit={handleSubmit}>
			<div className={css.form__inputs}>
				<Input label='Email' type='email' value={email} onChange={setEmail} autoComplete='email' />
				<Input label='Password' type='password' value={password} onChange={setPassword} autoComplete='current-password' />
			</div>

			<div className={css.form__actions}>
				<Checkbox value={rememberMe} onChange={setRememberMe}>Remember Me</Checkbox>
				<a href='#' className={css.form__link}>Forgot Password?</a>
			</div>

			<Button view='primary' type='submit'>Login</Button>
		</form>
	);
}
