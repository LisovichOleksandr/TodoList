import { Button } from '@mui/material'
import React, { useCallback } from 'react'
import { FilterValuesType } from './App'
import './App.css'
import AddItemForm from './components/AddItemForm'
import EditSpan from './components/EditSpan'

import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import {
	addTaskToolkitAC,
	changeStatusToolkitAC,
	changeTaskToolkitAC,
	deleteTaskToolkitAC,
	removeTodoListInTask,
} from './store/tasks-slice/tasks-slice'
import {
	changeNameTodoListToolkitAC,
	filterTodoListToolkitAC,
	removerTodoListToolkitAC,
} from './store/todoLists-slice/todoLists-slice'
import Task from './components/Task'

type PropsType = {
	id: string
	title: string
	filter: FilterValuesType
}

// COMPONENT
const TodoList = React.memo((props: PropsType) => {
	const reduxTasks = useAppSelector(state => state.tasksSlice)
	const dispatch = useAppDispatch()

	// FILTER
	let tasksForTodoList = reduxTasks[props.id]
	if (props.filter === 'active') {
		tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
	}
	if (props.filter === 'completed') {
		tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
	}
	const onAllClickHandler = useCallback(
		() =>
			dispatch(filterTodoListToolkitAC({ value: 'all', todoListId: props.id })),
		[dispatch, filterTodoListToolkitAC, props.id]
	)
	const onActiveClickHandler = useCallback(
		() =>
			dispatch(
				filterTodoListToolkitAC({ value: 'active', todoListId: props.id })
			),
		[dispatch, filterTodoListToolkitAC, props.id]
	)
	const onCompletedClickHandler = useCallback(
		() =>
			dispatch(
				filterTodoListToolkitAC({ value: 'completed', todoListId: props.id })
			),
		[dispatch, filterTodoListToolkitAC, props.id]
	)

	// FUNCTION
	const addTask = useCallback(
		(title: string) => {
			dispatch(addTaskToolkitAC({ value: title, todoListId: props.id }))
		},
		[dispatch, addTaskToolkitAC, props.id]
	)

	const removeTodoList = useCallback(() => {
		dispatch(removerTodoListToolkitAC(props.id))
		dispatch(removeTodoListInTask(props.id))
	}, [dispatch, removerTodoListToolkitAC, removeTodoListInTask, props.id])

	const changeTodoListName = useCallback(
		(title: string) => {
			dispatch(changeNameTodoListToolkitAC({ title, todoListId: props.id }))
		},
		[dispatch, changeNameTodoListToolkitAC, props.id]
	)

	// RETURN
	return (
		<div className='task-container'>
			<EditSpan title={props.title} changeTask={changeTodoListName} />
			<IconButton onClick={removeTodoList}>
				<Delete />
			</IconButton>
			{/* <button onClick={removeTodoList}>x</button> */}
			<AddItemForm addItem={addTask} />
			<ul>
				{tasksForTodoList.map(task => (
					<Task id={props.id} task={task} key={task.id} />
				))}
			</ul>
			<div className='buttons'>
				<Button
					color='inherit'
					variant={props.filter === 'all' ? 'contained' : 'text'}
					onClick={onAllClickHandler}
				>
					All
				</Button>
				<Button
					variant={props.filter === 'active' ? 'contained' : 'text'}
					onClick={onActiveClickHandler}
				>
					Active
				</Button>
				<Button
					color='secondary'
					variant={props.filter === 'completed' ? 'contained' : 'text'}
					onClick={onCompletedClickHandler}
				>
					Completed
				</Button>
			</div>
		</div>
	)
})

export default TodoList
