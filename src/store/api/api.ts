import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BASE_URL = 'http://localhost:3003'

type ResponseType = {
	messages: string
}

export const todoListApi = createApi({
	reducerPath: 'todoListApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3003/',
		headers: {},
	}),
	endpoints: builder => ({
		getTodoList: builder.query<ResponseType, string>({
			query: text => 'main',
		}),
	}),
})

export const { useGetTodoListQuery } = todoListApi
