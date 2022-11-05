import {MainLayout} from '../../layouts/main/MainLayout';
import css from './login.module.css';
import {Button} from '@components/button/Button';
import {Separator} from '@components/separator/Separator';
import googleIcon from './google.svg';
import {Form} from './components/form/Form';

export function Login() {
	function googleButtonPrefix() {
		return <img src={googleIcon} alt='Google icon' />;
	}

	return (
		<MainLayout>
			<div className={css.login__wr}>
				<img className={css.login__logo} src='./icon.svg' alt='logo icon' />
				<div className={css.login}>
					<div className={css.login__headers}>
						<h1 className={css.login__title}>Login to your Account</h1>
						<span>See what is going on with your business</span>
					</div>
					<Button view='secondary' renderPrefix={googleButtonPrefix}>Continue with Google</Button>

					<Separator className={css.login__separator}>or Sign in with Email</Separator>

					<Form />
				</div>
				<div className={css.login__empty}></div>
			</div>
			<footer className={css.login__footer}>
        Not Registered Yet?
				<a href='#'>Create an account</a>
			</footer>
		</MainLayout>
	);
}
