import {useState} from 'react';
import {MainLayout} from '../../layouts/main/MainLayout';
import css from './login.module.css';
import {Button} from '../../components/button/Button';
import {Input} from '../../components/input/Input';
import {Separator} from '../../components/separator/Separator';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function googleButtonPrefix() {
		return <img />;
	}

	return (
		<MainLayout>
			<div className={css.login}>
				<img className={css.login__logo} src='./icon.svg' alt='logo icon' />
				<h1>Login to your Account</h1>
				<span>See what is going on with your business</span>

				<Button view='secondary' renderPrefix={googleButtonPrefix}>Continue with Google</Button>

				<Separator className={css.login__separator}>or Sign in with Email</Separator>

				<form className={css.login__form}>
					<Input label='Email' type='email' value={email} onChange={setEmail} autoComplete='email' />
					<Input label='Password' type='password' value={password} onChange={setPassword} autoComplete='current-password' />

					<Button view='primary' type='submit'>Login</Button>
				</form>
			</div>
		</MainLayout>
	);
}
