import { createFileRoute } from "@tanstack/react-router";
import { Todo } from "../pages/todo/Todo";

export const Route = createFileRoute("/todo")({
	component: Todo,
});
