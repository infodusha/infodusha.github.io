import { Button } from "@components/button/Button";
import { SetStateAction, useEffect, useState } from "react";

const DEFAULT_PROJECT_NAME = "default";

export function Todo() {
	const [projects, setProjects] = useStorageState<Project[]>("projects", []);
	const [selected, setSelected] = useStorageState<string>(
		"selected",
		DEFAULT_PROJECT_NAME,
	);

	const projectsList = projects.length
		? projects
		: [{ name: DEFAULT_PROJECT_NAME, todos: [] }];
	const current = projectsList.find((project) => project.name === selected);

	if (!current) {
		setSelected(projects[0].name);
		return null;
	}

	function addProject() {
		const name = prompt("Enter project name");
		if (!name) {
			return;
		}

		if (projectsList.some((project) => project.name === name)) {
			alert("Project with this name already exists");
			return;
		}

		setProjects(() => [...projectsList, { name, todos: [] }]);
	}

	function addItem() {
		const text = prompt("Enter todo text");
		if (!text) {
			return;
		}

		const index = projectsList.indexOf(current!);
		setProjects(() =>
			projectsList.with(index, {
				...current!,
				todos: [...current!.todos, { text, isCompleted: false }],
			}),
		);
	}

	function renderProject(project: Project, i: number) {
		return (
			<Button key={i} view="primary" onClick={() => setSelected(project.name)}>
				{project.name}
			</Button>
		);
	}

	function renderTodo(todo: ToDo, i: number) {
		function handleComplete() {
			const index = current!.todos.indexOf(todo);
			setProjects(() =>
				projectsList.with(index, {
					...current!,
					todos: current!.todos.with(i, {
						...todo,
						isCompleted: !todo.isCompleted,
					}),
				}),
			);
		}

		function handleDelete() {
			const index = current!.todos.indexOf(todo);
			setProjects(() =>
				projectsList.with(index, {
					...current!,
					todos: current!.todos.filter((item) => item !== todo),
				}),
			);
		}

		return (
			<div className="flex gap-2 align-center" key={i}>
				<span className={todo.isCompleted ? "line-through" : ""}>
					{todo.text}
				</span>

				<Button key={i} view="secondary" onClick={handleComplete}>
					{todo.isCompleted ? "Undo" : "Complete"}
				</Button>

				<Button key={i} view="secondary" onClick={handleDelete}>
					delete
				</Button>
			</div>
		);
	}

	return (
		<div className="flex gap-4">
			<div className="flex flex-col gap-2">
				<Button view="secondary" onClick={addProject}>
					Add Project
				</Button>
				{projects.map(renderProject)}
			</div>
			<div className="flex flex-col gap-2">
				<h3 className="self-center">{current.name}</h3>
				<Button view="secondary" onClick={() => addItem()}>
					Add item
				</Button>
				{current.todos.map(renderTodo)}
			</div>
		</div>
	);
}

interface Project {
	name: string;
	todos: ToDo[];
}

interface ToDo {
	text: string;
	isCompleted: boolean;
}

function useStorageState<T>(key: string, initialValue: T) {
	const [state, setState] = useState<T>(() => {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : initialValue;
	});

	useEffect(() => {
		function handleStorageChange(event: StorageEvent) {
			if (event.key === key) {
				const newValue = event.newValue
					? JSON.parse(event.newValue)
					: initialValue;
				setState(newValue);
			}
		}

		window.addEventListener("storage", handleStorageChange);

		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	function saveAndSetState(value: SetStateAction<T>) {
		setState((prev) => {
			const newValue = (
				typeof value === "function"
					? (value as (prevState: T) => T)(prev)
					: value
			) as T;
			localStorage.setItem(key, JSON.stringify(newValue));
			return newValue;
		});
	}

	return [state, saveAndSetState] as const;
}
