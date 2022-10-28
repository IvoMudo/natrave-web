import { useLocalStorage } from 'react-use';
import { useFormik } from 'formik'
import * as yup from 'yup'

import logo from '../../assets/logo/logo-fundo-branco.svg'
import { Input } from '../../components/Input'
import { Icon } from '../../components/Icon'
import { Navigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
    email: yup.string().email('Informe um email válido').required('Informe o seu email'),
    password: yup.string().required('Digite uma senha'),
})

export const Login = () => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const formik = useFormik({
        onSubmit: async (values) => {
            const url = import.meta.env.VITE_API_URL + '/login'

            let headers = new Headers();
            headers.set('Authorization', 'Basic ' + btoa(values.email + ":" + values.password));

            const options = {
                method: 'GET',
                headers,
                data: values
            }
            const res = await fetch(url, options)

            setAuth(JSON.stringify(await res.json()))
        },
        initialValues: {
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
                            Entre na sua conta
                        </h2>
                    </header>

                    <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-4 p-4'>
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

                        <button type='submit'
                            disabled={formik.isSubmitting || !formik.isValid}
                            className=' text-center text-white text bold  bg-red-500 text-xl py-4 rounded-3xl disabled:opacity-20' >
                            {formik.isSubmitting ? "Carregando ..." : "Entrar"}
                        </button>
                    </form>
                </main>
            </div>
        )
        : (
            <Navigate to='/dashboard' replace={true} />
        )
}