import { createFileRoute } from "@tanstack/react-router";
import { Todo } from "../../pages/todo/Todo";

export const Route = createFileRoute("/_layout/todo")({
	component: Todo,
});
