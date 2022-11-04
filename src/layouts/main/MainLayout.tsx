import css from './main-layout.module.css';

type MainLayoutProps = {
	children: JSX.Element | JSX.Element[];
};

export function MainLayout({children}: MainLayoutProps) {
	return (
		<div className={css.mainLayout}>
			<div className={css.mainLayout__left}>
				<div className={css.mainLayout__ball}></div>
				<div className={css.mainLayout__bg}></div>
				<div className={css.mainLayout__texts}>
					<h4 className={css.mainLayout__header}>Turn your ideas into reality.</h4>
					<span>Start for free and get attractive offers from the community</span>
				</div>
				<div className={css.mainLayout__circle}></div>
			</div>
			<main className={css.mainLayout__content}>
				{children}
			</main>
		</div>
	);
}
