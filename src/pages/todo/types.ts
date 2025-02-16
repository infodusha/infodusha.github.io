export interface Project {
	name: string;
	todos: ToDo[];
}

export interface ToDo {
	text: string;
	isCompleted: boolean;
}
