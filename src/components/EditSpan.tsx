import { useState } from 'react'
import TextField from '@mui/material/TextField'

type PropsType = {
	title: string
	changeTask: (title: string) => void
}

const EditSpan = (props: PropsType) => {
	const [edit, setEdit] = useState<boolean>(false)
	const [editValue, setEditValue] = useState('')

	const onBlurChanged = (e: React.FocusEvent<HTMLInputElement>) => {
		props.changeTask(e.target.value)
		setEdit(false)
	}
	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditValue(e.target.value)
	}
	const spanHandler = () => {
		setEditValue(props.title)
		setEdit(true)
	}
	return (
		<>
			{edit ? (
				<TextField
					variant='standard'
					value={editValue}
					type='text'
					autoFocus={true}
					onBlur={onBlurChanged}
					onChange={onChangeInput}
				/>
			) : (
				<span onDoubleClick={spanHandler}>{props.title}</span>
			)}
		</>
	)
}

export default EditSpan
