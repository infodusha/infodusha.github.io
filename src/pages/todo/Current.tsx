import { Button } from "@components/button/Button";
import { Project, ToDo } from "./types";
import { ReactNode } from "@tanstack/react-router";

interface CurrentProps {
	item: Project;
	onChange(newItem: Project, resetSelected?: boolean): void;
	children: ReactNode;
}

export function Current({ item, onChange, children }: CurrentProps) {
	function addItem() {
		const text = prompt("Enter todo text");
		if (!text) {
			return;
		}

		onChange({
			...item,
			todos: [...item.todos, { text, isCompleted: false }],
		});
	}

	function renderTodo(todo: ToDo, todoIndex: number) {
		function handleComplete() {
			onChange({
				...item,
				todos: item.todos.with(todoIndex, {
					...todo,
					isCompleted: !todo.isCompleted,
				}),
			});
		}

		function handleDelete() {
			onChange(
				{
					...item,
					todos: item.todos.filter((x) => x !== todo),
				},
				true,
			);
		}

		return (
			<div className="flex gap-2 items-center justify-between" key={todoIndex}>
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
				<h2>Project: {item.name}</h2>
				<Button view="secondary" onClick={() => addItem()}>
					Add item
				</Button>
				{children}
			</div>
			{item.todos.map(renderTodo)}
		</div>
	);
}
