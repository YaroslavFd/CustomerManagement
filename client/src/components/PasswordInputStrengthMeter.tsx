import { useState } from 'react'
import { Box, PasswordInput, Popover, Progress, rem, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'

interface PasswordInputStrengthMeterProps {
    label: string
    placeholder: string
    withAsterisk: boolean
    passwordValue: string
    strength: number
    form: any
}

export const passwordRequirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z,а-я]/, label: 'Includes lowercase letter' },
    { re: /[A-Z, А-Я]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
]
export const PasswordInputStrengthMeter = ({
    label,
    placeholder,
    withAsterisk,
    form,
    passwordValue,
    strength,
}: PasswordInputStrengthMeterProps) => {
    const [popoverOpened, setPopoverOpened] = useState(false)
    const checks = passwordRequirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(passwordValue)}
        />
    ))

    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red'

    return (
        <Popover
            opened={popoverOpened}
            position='bottom'
            width='target'
            transitionProps={{ transition: 'pop' }}
        >
            <Popover.Target>
                <div
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                >
                    <PasswordInput
                        withAsterisk={withAsterisk}
                        label={label}
                        placeholder={placeholder}
                        {...form.getInputProps('password')}
                    />
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb='xs' />
                <PasswordRequirement
                    label='Includes at least 6 characters'
                    meets={passwordValue.length > 5}
                />
                {checks}
            </Popover.Dropdown>
        </Popover>
    )
}

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
    return (
        <Text
            c={meets ? 'teal' : 'red'}
            style={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size='sm'
        >
            {meets ? (
                <IconCheck style={{ width: rem(14), height: rem(14) }} />
            ) : (
                <IconX style={{ width: rem(14), height: rem(14) }} />
            )}{' '}
            <Box ml={10}>{label}</Box>
        </Text>
    )
}
