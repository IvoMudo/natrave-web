import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'
import { useFormik } from 'formik'
import * as yup from 'yup'

import logo from '../../assets/logo/logo-fundo-branco.svg'
import { Input } from '../../components/Input'
import { Icon } from '../../components/Icon'

const validationSchema = yup.object().shape({
    name: yup.string().required('Informe o seu nome'),
    username: yup.string().required('Insira um nome de usuário'),
    email: yup.string().email('Informe um email válido').required('Informe o seu email'),
    password: yup.string().required('Digite uma senha'),
})

export const SignUp = () => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const formik = useFormik({
        onSubmit: async (values) => {
            const url = `${import.meta.env.VITE_API_URL}/user`
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
            const res = await fetch(url, options)

            setAuth(JSON.stringify(await res.json()))
        },
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: ''
        },
        validationSchema
    })

    return (typeof auth === "object")
        ? (
            <div className='h-screen bg-white'>
                <header className='flex justify-center py-6 border-b-2 border-red-300' >
                    <a href="/">
                        <img src={logo} className='w-32 md:w-40' />
                    </a>
                </header>
                <main className='container mx-auto max-w-2xl p-5'>
                    <header className='flex items-center space-x-4 p-3'>
                        <a href="/">
                            <Icon iconName='Back' className='h-6' />
                        </a>

                        <h2 className='text-2xl font-bold'>
                            Crie sua conta
                        </h2>
                    </header>

                    <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-4 p-4'>
                        <Input
                            name='name'
                            type='text'
                            label='Seu nome'
                            placeholder='Digite seu nome'
                            value={formik.values.name}
                            handleChange={formik.handleChange}
                            blur={formik.handleBlur}
                            erro={(formik.touched.name && formik.errors.name) as string}
                        />

                        <Input
                            name='username'
                            type='text'
                            label='Seu nome de usuários'
                            placeholder='Digite um nome de usuário'
                            value={formik.values.username}
                            handleChange={formik.handleChange}
                            blur={formik.handleBlur}
                            erro={(formik.touched.username && formik.errors.username) as string}
                        />

                        <Input
                            name='email'
                            type='text'
                            label='Seu email'
                            placeholder='Digite seu e-mail'
                            value={formik.values.email}
                            handleChange={formik.handleChange}
                            blur={formik.handleBlur}
                            erro={(formik.touched.email && formik.errors.email) as string}
                        />

                        <Input
                            name='password'
                            type='password'
                            label='Sua senha'
                            placeholder='Digite uma senha'
                            value={formik.values.password}
                            handleChange={formik.handleChange}
                            blur={formik.handleBlur}
                            erro={(formik.touched.password && formik.errors.password) as string}
                        />

                        <button disabled={!formik.isValid} type='submit' className=' text-center text-white text bold  bg-red-500 text-xl py-4 rounded-3xl disabled:opacity-20'>
                            Criar minha conta
                        </button>
                    </form>
                </main>
            </div>
        )
        : (
            <Navigate to='/dashboard' replace={true} />
        )
}