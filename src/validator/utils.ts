import { ValidateBy, ValidationOptions, buildMessage, ValidationArguments } from 'class-validator'

export const IsBefore = (property: string, options?: ValidationOptions): PropertyDecorator =>
  ValidateBy(
    {
      name: 'IsBefore',
      constraints: [property],
      validator: {
        validate: (value: Date, args: ValidationArguments): boolean => {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName] as Date
          return value.toISOString() < relatedValue.toISOString()
        },
        defaultMessage: buildMessage((each: string): string => each + '$property must be before $constraint1', options),
      },
    },
    options,
    )
  
export const IsAfter = (property: string, options?: ValidationOptions): PropertyDecorator =>
  ValidateBy(
    {
      name: 'IsAfter',
      constraints: [property],
      validator: {
        validate: (value: Date, args: ValidationArguments): boolean => {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as Record<string, unknown>)[relatedPropertyName] as Date
          return value.toISOString() > relatedValue.toISOString()
        },
        defaultMessage: buildMessage((each: string): string => each + '$property must be after $constraint1', options),
      },
    },
    options,
  )