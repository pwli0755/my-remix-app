import type { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export default function LayoutPage() {
	return <>
    <div>remix form layout</div>
    <Outlet />
    </>
}
