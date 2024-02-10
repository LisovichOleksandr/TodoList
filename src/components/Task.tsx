import React, { useCallback } from 'react'

import EditSpan from './EditSpan'
import { useAppDispatch } from '../hooks/hooks'
import {
	TaskType,
	changeStatusToolkitAC,
	changeTaskToolkitAC,
	deleteTaskToolkitAC,
} from '../store/tasks-slice/tasks-slice'

import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

type TaskPropsType = {
	id: string
	task: TaskType
}

const Task: React.FC<TaskPropsType> = React.memo(props => {
	const dispatch = useAppDispatch()

	const onRemoveHandler = useCallback(
		() =>
			dispatch(
				deleteTaskToolkitAC({ id: props.task.id, todoListId: props.id })
			),
		[dispatch, deleteTaskToolkitAC, props.task.id, props.id]
	)
	const onChangeHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(
				changeStatusToolkitAC({
					taskId: props.task.id,
					isDone: e.currentTarget.checked,
					todoListId: props.id,
				})
			)
		},
		[dispatch, changeStatusToolkitAC, props.task.id, props.id]
	)
	const changeTask = useCallback(
		(title: string) => {
			dispatch(
				changeTaskToolkitAC({
					title: title,
					todoListId: props.id,
					taskId: props.task.id,
				})
			)
		},
		[dispatch, changeTaskToolkitAC, props.id, props.task.id]
	)
	return (
		<li key={props.task.id} className={!props.task.isDone ? 'is-done' : ''}>
			<input
				onChange={onChangeHandler}
				type='checkbox'
				checked={props.task.isDone}
			/>
			<EditSpan title={props.task.title} changeTask={changeTask} />
			<IconButton onClick={onRemoveHandler}>
				<Delete />
			</IconButton>
		</li>
	)
})
export default Task
