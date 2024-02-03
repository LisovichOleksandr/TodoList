import { useReducer } from 'react'
import { v1 } from 'uuid'

import './App.css'
import TodoList from './TodoList'
import AddItemForm from './components/AddItemForm'
import {
	addTaskAC,
	changeStatusAC,
	changeTaskAC,
	deleteTaskAC,
	taskReducer,
} from './state/task-reducer'
import {
	addTodoListAC,
	changeFilterAC,
	removeNameAC,
	removeTodoListAC,
	todoListsReducer,
} from './state/todolists-reducer'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListComponentType = {
	id: string
	title: string
	filter: FilterValuesType
}
export let todoListId1 = v1()
export let todoListId2 = v1()

const initialTodoListState: Array<TodoListComponentType> = [
	{
		id: todoListId1,
		title: 'Friday',
		filter: 'all',
	},
	{
		id: todoListId2,
		title: 'Saturday',
		filter: 'all',
	},
]

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

const initialTaskState: TasksStateType = {
	[todoListId1]: [
		{ id: v1(), title: 'HTML', isDone: true },
		{ id: v1(), title: 'CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: false },
		{ id: v1(), title: 'TypeScript', isDone: true },
	],
	[todoListId2]: [
		{ id: v1(), title: 'React', isDone: true },
		{ id: v1(), title: 'Redux', isDone: true },
		{ id: v1(), title: 'Toolkit', isDone: true },
	],
}

// COMPONENT
const AppWithReducer = () => {
	const [todoLists, dispatchTodoListReducer] = useReducer(
		todoListsReducer,
		initialTodoListState
	)

	const [tasksObj, dispatchToTasksReducer] = useReducer(
		taskReducer,
		initialTaskState
	)

	// ToDoList
	const addTodoList = (title: string) => {
		dispatchTodoListReducer(addTodoListAC(title))
		dispatchToTasksReducer(addTodoListAC(title))
	}

	const removeTodoList = (todoListId: string) => {
		const action = removeTodoListAC(todoListId)
		dispatchTodoListReducer(action)
		dispatchToTasksReducer(action)
	}

	const changeTodoListName = (title: string, todoListId: string) => {
		dispatchTodoListReducer(removeNameAC(todoListId, title))
	}

	function changeFilter(value: FilterValuesType, todoListId: string) {
		dispatchTodoListReducer(changeFilterAC(todoListId, value))
	}

	// Task

	const addTask = (value: string, todoListId: string) => {
		dispatchToTasksReducer(addTaskAC(todoListId, value))
	}

	const deleteTask = (id: string, todoListId: string) => {
		const action = deleteTaskAC(id, todoListId)
		dispatchToTasksReducer(action)
	}

	const changeTask = (title: string, todoListId: string, taskId: string) => {
		dispatchToTasksReducer(changeTaskAC(title, todoListId, taskId))
	}

	const changeStatus = (
		taskId: string,
		isDone: boolean,
		todoListId: string
	) => {
		dispatchToTasksReducer(changeStatusAC(taskId, isDone, todoListId))
	}

	// RETURN
	return (
		<div className='App'>
			<header className='App-header '>
				<h3>Add TodoList</h3>
				<AddItemForm addItem={addTodoList} />
			</header>
			<div className='main'>
				{todoLists.map(ts => {
					let tasksForTodoList = tasksObj[ts.id]
					if (ts.filter === 'active') {
						tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
					}
					if (ts.filter === 'completed') {
						tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
					}

					return (
						<TodoList
							key={ts.id}
							id={ts.id}
							title={ts.title}
							tasks={tasksForTodoList}
							deleteTask={deleteTask}
							changeFilter={changeFilter}
							addTask={addTask}
							changeStatus={changeStatus}
							filter={ts.filter}
							removeTodoList={removeTodoList}
							changeTask={changeTask}
							changeTodoListName={changeTodoListName}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default AppWithReducer
