import React, { useState, ChangeEventHandler } from 'react'
import '../App.css'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { IconButton } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

type PropsType = {
	addItem: (value: string) => void
}

const AddItemForm = (props: PropsType) => {
	const [error, setError] = useState<string | null>(null)
	const [value, setValue] = useState<string>('')

	function onNewTitleChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setValue(e.currentTarget.value)
	}

	function onKeyPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
		setError(null)
		if (e.ctrlKey && e.charCode === 13) {
			props.addItem(value)
			setValue('')
		}
	}

	function addTodoList() {
		if (value.trim() === '') {
			setError('title is required')
			return
		}
		setError('')
		props.addItem(value)
		setValue('')
	}

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
}

export default AddItemForm
