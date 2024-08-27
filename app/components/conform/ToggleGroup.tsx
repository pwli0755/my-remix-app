import {
	type FieldMetadata,
	getInputProps,
	unstable_useControl as useControl,
	useInputControl,
} from '@conform-to/react'
import { type ComponentProps, type ElementRef, useRef } from 'react'
import { ToggleGroup, ToggleGroupItem } from '#app/components/ui/toggle-group'

export const ToggleGroupConform = ({
	meta,
	items,
	...props
}: {
	items: Array<{ value: string; label: string }>
	meta: FieldMetadata<string>
} & Omit<ComponentProps<typeof ToggleGroup>, 'defaultValue'>) => {
	const toggleGroupRef = useRef<ElementRef<typeof ToggleGroup>>(null)
	const control = useInputControl(meta)

	return (
		<>
			<input
				name={meta.name}
				className="sr-only"
				tabIndex={-1}
				defaultValue={meta.initialValue}
				onFocus={() => {
					toggleGroupRef.current?.focus()
				}}
			/>
			<ToggleGroup
				{...props}
				type="single"
				value={control.value}
				ref={toggleGroupRef}
				onValueChange={(value: string) => {
					;(props.onValueChange as (v: string) => void)?.(value)
					control.change(value)
				}}
				onBlur={control.blur}
			>
				{items.map((item) => (
					<ToggleGroupItem key={item.value} value={item.value}>
						{item.label}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</>
	)
}

export const ToggleGroupsConform = ({
	meta,
	items,
	...props
}: {
	items: Array<{ value: string; label: string }>
	meta: FieldMetadata<string[]>
} & Omit<ComponentProps<typeof ToggleGroup>, 'defaultValue' | 'type'>) => {
	const toggleGroupRef = useRef<ElementRef<typeof ToggleGroup>>(null)
	const control = useInputControl<string[]>(meta)

	return (
		<>
			<input
				name={meta.name}
				className="sr-only"
				tabIndex={-1}
				defaultValue={meta.initialValue}
				onFocus={() => {
					toggleGroupRef.current?.focus()
				}}
			/>
			<ToggleGroup
				{...props}
				type="multiple"
				value={control.value}
				ref={toggleGroupRef}
				onValueChange={(value: string[]) => {
					;(props.onValueChange as (v: string[]) => void)?.(value)
					control.change(value)
					console.log('--------------', value)
				}}
				onBlur={control.blur}
			>
				{items.map((item) => (
					<ToggleGroupItem key={item.value} value={item.value}>
						{item.label}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</>
	)
}
