import { Button } from "@components/button/Button";
import { useStorageState } from "./use-storage-state";
import { Current } from "./Current";
import { Project } from "./types";

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
		setProjects((prev) => prev.filter((item) => item !== current));
	}

	function renderCurrent() {
		if (!current) {
			return null;
		}

		const currentIndex = projects.indexOf(current);

		function handleCurrentChange(newItem: Project, resetSelected = false) {
			setProjects((prev) => prev.with(currentIndex, newItem));
			if (resetSelected) {
				setSelected(DEFAULT_PROJECT_NAME);
			}
		}

		return (
			<Current item={current} onChange={handleCurrentChange}>
				<Button view="secondary" onClick={deleteProject}>
					Delete project
				</Button>
			</Current>
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
			{renderCurrent()}
		</div>
	);
}
