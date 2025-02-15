import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/about")({
	component: About,
});

function About() {
	return <div className="p-2">Something about me</div>;
}
