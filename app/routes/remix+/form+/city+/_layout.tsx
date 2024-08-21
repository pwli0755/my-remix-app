import type { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

export default function CityLayout() {
	return <>
    <div>remix form city layout</div>
    <Outlet />
    </>
}
