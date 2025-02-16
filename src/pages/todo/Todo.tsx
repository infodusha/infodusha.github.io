import { Button } from "@components/button/Button";
import { SetStateAction, useEffect, useState } from "react";

const DEFAULT_PROJECT_NAME = "default";

export function Todo() {
	const [projects, setProjects] = useStorageState<Project[]>("projects", [
		{ name: DEFAULT_PROJECT_NAME, todos: [] },
	]);
	const [selected, setSelected] = useStorageState<string>(
		"selected",
		DEFAULT_PROJECT_NAME,
	);

	const current = projects.find((project) => project.name === selected);

	function addItem() {
		const text = prompt("Enter todo text");
		if (!text) {
			return;
		}

		const index = projects.indexOf(current!);
		setProjects(() =>
			projects.with(index, {
				...current!,
				todos: [...current!.todos, { text, isCompleted: false }],
			}),
		);
	}

	function renderProject(project: Project) {
		return (
			<Button
				key={project.name}
				view="secondary"
				onClick={() => setSelected(project.name)}
			>
				{project.name}
			</Button>
		);
	}

	function addProject() {
		const name = prompt("Enter project name");
		if (!name) {
			return;
		}

		if (projects.some((project) => project.name === name)) {
			alert("Project with this name already exists");
			return;
		}

		setProjects((prev) => [...prev, { name, todos: [] }]);
	}

	function deleteProject() {
		setProjects((prev) => prev.filter((item) => item !== current!));
	}

	function renderSelected() {
		if (!current) {
			return null;
		}

		const currentIndex = projects.indexOf(current);

		function renderTodo(todo: ToDo, todoIndex: number) {
			function handleComplete() {
				setProjects((prev) =>
					prev.with(currentIndex, {
						...current!,
						todos: current!.todos.with(todoIndex, {
							...todo,
							isCompleted: !todo.isCompleted,
						}),
					}),
				);
			}

			function handleDelete() {
				setProjects((prev) =>
					prev.with(currentIndex, {
						...current!,
						todos: current!.todos.filter((item) => item !== todo),
					}),
				);
				setSelected(DEFAULT_PROJECT_NAME);
			}

			return (
				<div
					className="flex gap-2 items-center justify-between"
					key={todoIndex}
				>
					<span className={todo.isCompleted ? "line-through" : ""}>
						{todo.text}
					</span>

					<div className="flex gap-2">
						<Button view="secondary" onClick={handleComplete}>
							{todo.isCompleted ? "Undo" : "Complete"}
						</Button>

						<Button view="secondary" onClick={handleDelete}>
							Delete
						</Button>
					</div>
				</div>
			);
		}

		return (
			<div className="flex flex-col gap-2">
				<div className="flex gap-2 items-center">
					<h2>Project: {current.name}</h2>
					<Button view="secondary" onClick={() => addItem()}>
						Add item
					</Button>
					<Button view="secondary" onClick={deleteProject}>
						Delete project
					</Button>
				</div>
				{current.todos.map(renderTodo)}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-3 gap-4 p-4">
			<div className="flex flex-col gap-2">
				<Button view="primary" onClick={addProject}>
					Add Project
				</Button>
				{projects.map(renderProject)}
			</div>
			{renderSelected()}
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
