import React, { useState } from 'react'
import { FilterValuesType, TaskType } from './App'
import './App.css'
import AddItemForm from './components/AddItemForm'
import EditSpan from './components/EditSpan'
import { Button } from '@mui/material'

import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	deleteTask: (id: string, todoListId: string) => void
	changeFilter: (value: FilterValuesType, todoListId: string) => void
	addTask: (value: string, todoListId: string) => void
	changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
	filter: FilterValuesType
	removeTodoList: (todoListId: string) => void
	changeTask: (title: string, todoListId: string, taskId: string) => void
	changeTodoListName: (title: string, todoListId: string) => void
}

// COMPONENT
const Task = (props: PropsType) => {
	// const [edit, setEdit] = useState<boolean>(false)

	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () =>
		props.changeFilter('completed', props.id)

	const removeTodoList = () => {
		props.removeTodoList(props.id)
	}

	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}
	const changeTodoListName = (title: string) => {
		props.changeTodoListName(title, props.id)
	}
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
				{props.tasks.map(task => {
					const onRemoveHandler = () => props.deleteTask(task.id, props.id)
					const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
						props.changeStatus(task.id, e.currentTarget.checked, props.id)
					}
					const changeTask = (title: string) => {
						props.changeTask(title, props.id, task.id)
					}

					return (
						<li key={task.id} className={!task.isDone ? 'is-done' : ''}>
							<input
								onChange={onChangeHandler}
								type='checkbox'
								checked={task.isDone}
							/>
							<EditSpan title={task.title} changeTask={changeTask} />
							<IconButton onClick={onRemoveHandler}>
								<Delete />
							</IconButton>
						</li>
					)
				})}
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
}

export default Task
