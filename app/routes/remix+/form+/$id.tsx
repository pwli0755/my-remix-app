import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	return { params }
}

export default function FormPage() {
	const { params } = useLoaderData<typeof loader>()
	return <div>remix form id index {params.id} ttt</div>
}
