import { Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { matchesField, useForm } from '@mantine/form'
import { useState } from 'react'
import { PasswordInputStrengthMeter, passwordRequirements } from './PasswordInputStrengthMeter.tsx'
import { getStrength } from '../utils.ts'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.tsx'
import { useMediaQuery } from '@mantine/hooks'

export const SignUpForm = () => {
    const matches = useMediaQuery('(max-width: 767px)')
    const { signUp } = useAuth()
    const [error, setError] = useState<null | string>(null)
    const [passwordValue, setPasswordValue] = useState('')
    let strength = 10

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            fullName: '',
            login: '',
            password: passwordValue,
            confirmPassword: '',
        },

        validate: {
            fullName: (value) =>
                value.length < 6 || value.length > 50
                    ? 'This field must be 6-50 characters long'
                    : /^[a-zA-Zа-яА-Я\s]*$/.test(value)
                      ? null
                      : 'This field can only contain letters and spaces',
            login: (value) => {
                if (value.length < 3 || value.length > 12) {
                    return 'Login must be 3-12 characters long'
                } else if (/\s/.test(value)) {
                    return 'Login cannot contain spaces'
                }
                return null
            },
            password: (value) => {
                const strength = getStrength(passwordRequirements, value)
                return strength === 100 ? null : 'Password does not meet the required strength'
            },
            confirmPassword: matchesField('password', 'Passwords are not the same'),
        },
    })

    form.watch('password', ({ value }) => {
        setPasswordValue(value)
    })

    const handleFormSubmit = async () => {
        const { fullName, login, password } = form.getValues()
        const newUser = {
            fullName,
            login,
            password,
        }
        const result = await signUp(newUser)

        if (result) {
            form.reset()
            setError(null)
            return
        }

        setError('Пользователь с таким логином уже существует!')
        form.setErrors({ login: ' ' })
    }

    return (
        <Container size={450} px={5} style={{ width: '100%', color: '#c9c9c9' }}>
            <Title ta='center'>Create an account!</Title>

            <Paper shadow='md' p={matches ? 20 : 30} mt={30} radius='md' bg='#1f1f1f'>
                <form action='#' onSubmit={form.onSubmit(handleFormSubmit)}>
                    <TextInput
                        label='Full name'
                        placeholder='Your full name'
                        withAsterisk
                        mb='md'
                        {...form.getInputProps('fullName')}
                    />
                    <TextInput
                        label='Login'
                        placeholder='Your login'
                        withAsterisk
                        mb='md'
                        {...form.getInputProps('login')}
                    />

                    <PasswordInputStrengthMeter
                        label='Password'
                        placeholder='Your password'
                        withAsterisk
                        passwordValue={passwordValue}
                        strength={strength}
                        form={form}
                    />

                    <PasswordInput
                        label='Confirm password'
                        placeholder='Your password'
                        withAsterisk
                        mt='md'
                        {...form.getInputProps('confirmPassword')}
                    />

                    {error && (
                        <Text c='red' size='sm' mt='md'>
                            {error}
                        </Text>
                    )}

                    <Button type='submit' fullWidth mt='xl'>
                        Sign up
                    </Button>

                    <Text c='dimmed' size='sm' ta='center' mt={10}>
                        Already have an account?{' '}
                        <Link to='/login' style={{ color: '#4dabf7', textDecoration: 'none' }}>
                            Sign in
                        </Link>
                    </Text>
                </form>
            </Paper>
        </Container>
    )
}
