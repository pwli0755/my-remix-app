import type { ActionFunctionArgs } from '@remix-run/node'
import React from 'react'

import {
	Tabs,
	Tab,
	Input,
	Link,
	Button,
	Card,
	CardBody,
	CardHeader,
} from '@nextui-org/react'
import { Form, json } from '@remix-run/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRemixForm, getValidatedFormData } from 'remix-hook-form'

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).default('11111111'),
	intent: z.string().default('login'),
})

type loginFormData = z.infer<typeof loginSchema>
const resolver = zodResolver(loginSchema)

export const action = async ({ request }: ActionFunctionArgs) => {
	const {
		errors,
		data,
		receivedValues: defaultValues,
	} = await getValidatedFormData<FormData>(request, resolver)
	if (errors) {
		// The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
		return json({ errors, defaultValues })
	}

	if (defaultValues.intent === 'login') {
		return json({ errors: { email: 'user not exsist' }, defaultValues })
	}
	// Do something with the data
	return json(data)
}

export default function App() {
	const [selected, setSelected] = React.useState('login')
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useRemixForm<loginFormData>({
		mode: 'onSubmit',
		resolver,
		reValidateMode: 'onChange',
	})

	return (
		<div className="flex w-full flex-col">
			<Card className="h-[400px] w-[340px] max-w-full">
				<CardBody className="overflow-hidden">
					<Tabs
						fullWidth
						size="md"
						aria-label="Tabs form"
						selectedKey={selected}
						onSelectionChange={setSelected}
					>
						<Tab key="login" title="Login">
							<Form
								method="POST"
								onSubmit={handleSubmit}
								className="flex flex-col gap-4"
							>
								<Input
									// isRequired
									label="Email"
									placeholder="Enter your email"
									// type="email"
									isInvalid={!!errors.email?.message}
									errorMessage={errors.email?.message}
									{...register('email')}
								/>
								<Input
									isRequired
									label="Password"
									placeholder="Enter your password"
									type="password"
									{...register('password')}
								/>
								<p className="text-small text-center">
									Need to create an account?{' '}
									<Link size="sm" onPress={() => setSelected('sign-up')}>
										Sign up
									</Link>
								</p>
								<div className="flex justify-end gap-2">
									<Button
										fullWidth
										color="primary"
										name="intent"
										value="login"
										type="submit"
									>
										Login
									</Button>
								</div>
							</Form>
						</Tab>
						<Tab key="sign-up" title="Sign up">
							<Form
								method="POST"
								onSubmit={handleSubmit}
								className="flex h-[300px] flex-col gap-4"
							>
								<Input
									isRequired
									name="name"
									label="Name"
									placeholder="Enter your name"
									type="password"
								/>
								<Input
									isRequired
									label="Email"
									name="email"
									placeholder="Enter your email"
									type="email"
								/>
								<Input
									isRequired
									label="Password"
									name="password"
									placeholder="Enter your password"
									type="password"
								/>
								<p className="text-small text-center">
									Already have an account?{' '}
									<Link size="sm" onPress={() => setSelected('login')}>
										Login
									</Link>
								</p>
								<div className="flex justify-end gap-2">
									<Button
										fullWidth
										color="primary"
										name="intent"
										value="sign-up"
										type="submit"
									>
										Sign up
									</Button>
								</div>
							</Form>
						</Tab>
					</Tabs>
				</CardBody>
			</Card>
		</div>
	)
}
