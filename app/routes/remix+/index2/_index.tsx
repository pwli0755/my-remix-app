import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import type { ActionFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { z } from 'zod'

const schema = z.object({
	email: z.string().email(),
	password: z.string(),
	remember: z.boolean().optional(),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, { schema })

	if (submission.status !== 'success') {
		return json(submission.reply())
	}

	// ...
}

export default function Login() {
	// Last submission returned by the server
	const lastResult = useActionData<typeof action>()
	const [form, fields] = useForm({
		// Sync the result of last submission
		lastResult,

		// Reuse the validation logic on the client
		onValidate({ formData }) {
			return parseWithZod(formData, { schema })
		},

		// Validate the form on blur event triggered
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
        <>
        <h1>Remix</h1>
        <Form method="post" id={form.id} onSubmit={form.onSubmit} noValidate>
			<div>
				<label>Email</label>
				<input
					type="email"
					key={fields.email.key}
					name={fields.email.name}
					defaultValue={fields.email.initialValue}
				/>
				<div>{fields.email.errors}</div>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					key={fields.password.key}
					name={fields.password.name}
					defaultValue={fields.password.initialValue}
				/>
				<div>{fields.password.errors}</div>
			</div>
			<label>
				<div>
					<span>Remember me</span>
					<input
						type="checkbox"
						key={fields.remember.key}
						name={fields.remember.name}
						defaultChecked={fields.remember.initialValue === 'on'}
					/>
				</div>
			</label>
			<hr />
			<button>Login</button>
		</Form>
        </>
		
	)
}
