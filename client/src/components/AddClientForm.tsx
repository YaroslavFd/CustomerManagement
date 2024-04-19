import { isNotEmpty, matches, useForm } from '@mantine/form'
import { Button, Group, NativeSelect, Text, TextInput } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useState } from 'react'
import axios from 'axios'
import { useUpdateClients } from '../hooks/useUpdateClients.tsx'
import { useAuth } from '../hooks/useAuth.tsx'

export const AddClientForm = () => {
    const { refreshClients } = useUpdateClients()
    const { user } = useAuth()
    const [statusValue, setStatusValue] = useState('Не в работе')
    const [dateValue, setDateValue] = useState<Date | null | string>(null)
    const [error, setError] = useState<null | string>(null)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            last_name: '',
            first_name: '',
            middle_name: '',
            birthday: dateValue,
            inn: '',
            responsible_full_name: user?.full_name || '',
            status: statusValue,
        },

        validate: {
            last_name: (value) =>
                value.length < 2 || value.length > 18
                    ? 'This field must be 2-18 characters long'
                    : /^[a-zA-Zа-яА-Я\s]*$/.test(value)
                      ? null
                      : 'This field can only contain letters',
            first_name: (value) =>
                value.length < 2 || value.length > 18
                    ? 'This field must be 2-18 characters long'
                    : /^[a-zA-Zа-яА-Я\s]*$/.test(value)
                      ? null
                      : 'This field can only contain letters',
            middle_name: (value) =>
                value.length < 2 || value.length > 18
                    ? 'This field must be 2-18 characters long'
                    : /^[a-zA-Zа-яА-Я\s]*$/.test(value)
                      ? null
                      : 'This field can only contain letters',
            birthday: isNotEmpty('This field is required'),
            inn: matches(/^\d{10,12}$/, 'INN must be 10 or 12 digits long'),
            responsible_full_name: (value) =>
                value.length < 6 || value.length > 50
                    ? 'This field must be 6-50 characters long'
                    : /^[a-zA-Zа-яА-Я\s]*$/.test(value)
                      ? null
                      : 'This field can only contain letters and spaces',
            status: isNotEmpty('This field is required'),
        },
    })

    form.watch('status', ({ value }) => {
        setStatusValue(value)
    })

    form.watch('birthday', ({ value }) => {
        setDateValue(value)
    })

    const handleFormSubmit = async () => {
        try {
            const data = form.getValues()

            if (data.birthday instanceof Date) {
                data.birthday = data.birthday.toISOString().split('T')[0]
            }

            const result = await axios.post('http://localhost:5000/api/clients', data, {
                withCredentials: true,
            })

            if (result.status === 201) {
                form.reset()
                setDateValue(null)
                setError(null)
                refreshClients()
                return
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('An unexpected error occurred')
            }
        }
    }

    return (
        <form style={{ maxWidth: '400px' }} onSubmit={form.onSubmit(handleFormSubmit)}>
            <TextInput
                label='Фамилия'
                placeholder='Введите фамилию'
                withAsterisk
                mt='md'
                {...form.getInputProps('last_name')}
            />
            <TextInput
                label='Имя'
                placeholder='Введите имя'
                withAsterisk
                mt='md'
                {...form.getInputProps('first_name')}
            />
            <TextInput
                label='Отчество'
                placeholder='Введите отчество'
                withAsterisk
                mt='md'
                {...form.getInputProps('middle_name')}
            />

            <DatePickerInput
                label='Дата рождения'
                placeholder='Введите дату рождения'
                valueFormat='DD.MM.YYYY'
                withAsterisk
                mt='md'
                value={dateValue}
                {...form.getInputProps('birthday')}
            />

            <TextInput
                label='ИНН'
                placeholder='Введите ИНН'
                withAsterisk
                mt='md'
                {...form.getInputProps('inn')}
            />

            <TextInput
                label='ФИО ответственного'
                placeholder='Введите ФИО ответственного'
                withAsterisk
                mt='md'
                {...form.getInputProps('responsible_full_name')}
            />

            <NativeSelect
                label='Статус'
                data={['Не в работе', 'В работе', 'Отказ', 'Сделка закрыта']}
                {...form.getInputProps('status')}
                mt='md'
            />

            {error && (
                <Text c='red' size='sm' mt='md'>
                    {error}
                </Text>
            )}

            <Group mt='xl'>
                <Button type='submit' w='200px'>
                    Submit
                </Button>
            </Group>
        </form>
    )
}
