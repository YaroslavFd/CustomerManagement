import {
    Anchor,
    Box,
    Button,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.tsx'
import { useMediaQuery } from '@mantine/hooks'
export const LoginForm = () => {
    const matches = useMediaQuery('(max-width: 767px)')
    const { login } = useAuth()
    const [error, setError] = useState<null | string>(null)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            login: '',
            password: '',
        },

        validate: {
            login: isNotEmpty('Enter your login'),
            password: isNotEmpty('Enter your password'),
        },
    })

    const handleFormSubmit = async () => {
        const data = form.getValues()

        const result = await login(data)

        if (result) {
            form.reset()
            setError(null)
            return
        }

        setError('Неверный логин или пароль!')
        form.setErrors({ login: ' ', password: ' ' })
    }

    return (
        <Container size={450} px={5} style={{ width: '100%', color: '#c9c9c9' }}>
            <Title ta='center'>Welcome back!</Title>
            <Text c='dimmed' size='sm' ta='center' mt={5}>
                Do not have an account yet?{' '}
                <Link to='/signup' style={{ color: '#4dabf7', textDecoration: 'none' }}>
                    Create account
                </Link>
            </Text>

            <Paper shadow='md' p={matches ? 20 : 30} mt={30} radius='md' bg='#1f1f1f'>
                <form action='#' onSubmit={form.onSubmit(handleFormSubmit)}>
                    <TextInput
                        label='Login'
                        placeholder='Your login'
                        withAsterisk
                        {...form.getInputProps('login')}
                    />
                    <PasswordInput
                        label='Password'
                        placeholder='Your password'
                        withAsterisk
                        mt='md'
                        {...form.getInputProps('password')}
                    />
                    <Group mt='lg'>
                        {error && (
                            <Text c='red' size='sm'>
                                {error}
                            </Text>
                        )}
                        <Box ml='auto'>
                            <Anchor size='sm'>Forgot password?</Anchor>
                        </Box>
                    </Group>
                    <Button type='submit' fullWidth mt='xl'>
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}
