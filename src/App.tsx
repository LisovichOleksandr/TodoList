import { useState } from 'react'
import { v1 } from 'uuid'

import './App.css'
import TodoList from './TodoList'
import AddItemForm from './components/AddItemForm'

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
const App = () => {
	const [todoLists, setTodoList] =
		useState<Array<TodoListComponentType>>(initialTodoListState)
	const [tasksObj, setTasksObj] = useState<TasksStateType>(initialTaskState)

	// ToDoList
	const addTodoList = (title: string) => {
		const newTodoList: TodoListComponentType = {
			id: v1(),
			title,
			filter: 'all',
		}
		tasksObj[newTodoList.id] = []
		setTodoList([...todoLists, newTodoList])
		console.log(tasksObj)
	}

	const removeTodoList = (todoListId: string) => {
		let todoListFiltered = todoLists.filter(tl => tl.id !== todoListId)
		setTodoList(todoListFiltered)
	}

	const changeTodoListName = (title: string, todoListId: string) => {
		let todoList = todoLists.find(tl => tl.id === todoListId)
		if (todoList) {
			todoList.title = title
			setTodoList([...todoLists])
		}
	}

	function changeFilter(value: FilterValuesType, todoListId: string) {
		let todoList = todoLists.find(tl => tl.id === todoListId)
		if (todoList) {
			todoList.filter = value
			setTodoList([...todoLists])
		}
	}

	// Task

	const addTask = (value: string, todoListId: string) => {
		let task = { id: v1(), title: value, isDone: false }
		let tasks = tasksObj[todoListId]
		let newTasks = [task, ...tasks]
		tasksObj[todoListId] = newTasks
		setTasksObj({ ...tasksObj })
	}

	const deleteTask = (id: string, todoListId: string) => {
		let tasks = tasksObj[todoListId].filter(ts => ts.id !== id)
		tasksObj[todoListId] = tasks
		setTasksObj({ ...tasksObj })
	}

	const changeTask = (title: string, todoListId: string, taskId: string) => {
		let task = tasksObj[todoListId].find(ts => ts.id === taskId)
		if (task) {
			task.title = title
		}
		setTasksObj({ ...tasksObj })
	}

	const changeStatus = (
		taskId: string,
		isDone: boolean,
		todoListId: string
	) => {
		let tasksFind = tasksObj[todoListId]
		let task = tasksFind.find(t => t.id === taskId)
		if (task) {
			task.isDone = isDone
			setTasksObj({ ...tasksObj })
		}
	}

	// RETURN
	return (
		<div className='App'>
			<header className='App-header '>
				<h3>Add Task</h3>
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
							filter={ts.filter}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default App
