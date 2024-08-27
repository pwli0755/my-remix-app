import {
	unstable_useControl as useControl,
	useInputControl,
	type FieldMetadata,
} from '@conform-to/react'
import {
	useRef,
	type ElementRef,
	ComponentProps,
	useEffect,
	useState,
} from 'react'
import {
	SelectTrigger,
	Select,
	SelectValue,
	SelectContent,
	SelectItem,
} from '#app/components/ui/select'

export const SelectConform = ({
	meta,
	items,
	placeholder,
	...props
}: {
	meta: FieldMetadata<string>
	items: Array<{ name: string; value: string }>
	placeholder: string
} & ComponentProps<typeof Select>) => {
	const selectRef = useRef<ElementRef<typeof SelectTrigger>>(null)
	const control = useInputControl(meta);
	return (
		<>
			<input
				name={meta.name}
				defaultValue={meta.initialValue ?? ''}
				className="sr-only"
				aria-hidden
				tabIndex={-1}
				onFocus={() => {
					selectRef.current?.focus()
				}}
			>
			</input>

			<Select
				{...props}
				value={control.value ?? ''}
				onValueChange={control.change}
				onOpenChange={(open) => {
					if (!open) {
						control.blur()
					}
				}}
			>
				<SelectTrigger ref={selectRef} id={meta.id}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{items.map((item) => {
						return (
							<SelectItem key={item.value} value={item.value}>
								{item.name}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
		</>
	)
}
