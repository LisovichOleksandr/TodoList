import { useReducer } from 'react'
import { v1 } from 'uuid'

import './App.css'
import TodoList from './TodoList'
import AddItemForm from './components/AddItemForm'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

import {
	addTaskToolkitAC,
	addTodoListInTask,
	changeStatusToolkitAC,
	changeTaskToolkitAC,
	deleteTaskToolkitAC,
	removeTodoListInTask,
} from './store/tasks-slice/tasks-slice'
import {
	FilterValuesType,
	addTodoListToolkitAC,
	changeNameTodoListToolkitAC,
	filterTodoListToolkitAC,
	removerTodoListToolkitAC,
} from './store/todoLists-slice/todoLists-slice'

// COMPONENT
const AppWithReduxToolkit = () => {
	const reduxTodoLists = useAppSelector(state => state.todoListsSlice)
	const reduxTasks = useAppSelector(state => state.tasksSlice)
	const dispatch = useAppDispatch()
	// TILL ReduxToolkit

	// ToDoList
	const addTodoList = (title: string) => {
		let id = v1()
		dispatch(addTodoListInTask({ id }))
		dispatch(addTodoListToolkitAC({ id, title }))
	}

	const removeTodoList = (todoListId: string) => {
		dispatch(removerTodoListToolkitAC(todoListId))
		dispatch(removeTodoListInTask(todoListId))
	}

	const changeTodoListName = (title: string, todoListId: string) => {
		dispatch(changeNameTodoListToolkitAC({ title, todoListId }))
	}

	function changeFilter(value: FilterValuesType, todoListId: string) {
		dispatch(filterTodoListToolkitAC({ value, todoListId }))
	}

	// Task

	const addTask = (value: string, todoListId: string) => {
		dispatch(addTaskToolkitAC({ value, todoListId }))
	}

	const deleteTask = (id: string, todoListId: string) => {
		dispatch(deleteTaskToolkitAC({ id, todoListId }))
	}

	const changeTask = (title: string, todoListId: string, taskId: string) => {
		dispatch(changeTaskToolkitAC({ title, todoListId, taskId }))
	}

	const changeStatus = (
		taskId: string,
		isDone: boolean,
		todoListId: string
	) => {
		dispatch(changeStatusToolkitAC({ taskId, isDone, todoListId }))
	}

	// RETURN
	return (
		<div className='App'>
			<header className='App-header '>
				<h3>Add TodoList</h3>
				<AddItemForm addItem={addTodoList} />
			</header>
			<div className='main'>
				{reduxTodoLists.map(ts => {
					let tasksForTodoList = reduxTasks[ts.id]
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

export default AppWithReduxToolkit
