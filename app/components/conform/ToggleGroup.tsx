import {
	FieldMetadata,
	unstable_useControl as useControl,
	useInputControl,
} from '@conform-to/react'
import { ComponentProps, ElementRef, useRef } from 'react'
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
	const control = useControl(meta)

	return (
		<>
			<input
				name={meta.name}
				ref={control.register}
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
				ref={toggleGroupRef}
				value={control.value}
				onValueChange={(value: string) => {
					(props.onValueChange as (v:string)=>void)?.(value)
					control.change(value)
				}}
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

// export const ToggleGroupsConform = ({
// 	meta,
// 	items,
// 	...props
// }: {
// 	items: Array<{ value: string; label: string }>
// 	meta: FieldMetadata<string>
// } & Omit<ComponentProps<typeof ToggleGroup>, 'defaultValue' | 'type'>) => {
// 	const toggleGroupRef = useRef<ElementRef<typeof ToggleGroup>>(null)
// 	const control = useControl(meta)

// 	return (
// 		<>
// 			<input
// 				name={meta.name}
// 				ref={control.register}
// 				className="sr-only"
// 				tabIndex={-1}
// 				defaultValue={meta.initialValue}
// 				onFocus={() => {
// 					toggleGroupRef.current?.focus()
// 				}}
// 			/>
// 			<ToggleGroup
// 				{...props}
// 				type="multiple"
// 				ref={toggleGroupRef}
// 				value={control.value}
// 				onValueChange={(value) => {
// 					props.onValueChange?.(value)
// 					control.change(value)
// 				}}
// 			>
// 				{items.map((item) => (
// 					<ToggleGroupItem key={item.value} value={item.value}>
// 						{item.label}
// 					</ToggleGroupItem>
// 				))}
// 			</ToggleGroup>
// 		</>
// 	)
// }
