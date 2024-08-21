import type { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export default function RemixLayout() {
	return (
		<>
			<h1>Remix Layout</h1>
			<Outlet />
		</>
	)
}
