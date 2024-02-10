import React, { useState, useCallback } from 'react'
import '../App.css'
import TextField from '@mui/material/TextField'
import { IconButton } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

type PropsType = {
	addItem: (value: string) => void
}

const AddItemForm = React.memo((props: PropsType) => {
	const [error, setError] = useState<string | null>(null)
	const [value, setValue] = useState<string>('')

	const onNewTitleChangeHandler = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setValue(e.currentTarget.value)
		},
		[setValue]
	)

	const onKeyPressHandler = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (error !== null) {
				setError(null)
			}
			if (e.ctrlKey && e.charCode === 13) {
				props.addItem(value)
				setValue('')
			}
		},
		[error, value]
	)

	const addTodoList = useCallback(() => {
		if (value.trim() === '') {
			setError('title is required')
			return
		}
		setError('')
		props.addItem(value)
		setValue('')
	}, [value, setError, props.addItem, setValue])

	return (
		<div>
			<TextField
				variant='filled'
				label={'Create Task'}
				type='text'
				value={value}
				onChange={onNewTitleChangeHandler}
				onKeyPress={onKeyPressHandler}
				error={!!error}
				helperText={error}
			/>
			<IconButton onClick={addTodoList} color={'primary'}>
				<ControlPointIcon />
			</IconButton>
		</div>
	)
})
export default AddItemForm
