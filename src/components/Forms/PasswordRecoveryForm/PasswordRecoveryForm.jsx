import { Link } from 'react-router-dom';
import '../forms.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { userApi } from '../../../utils/apiUser';
import { checkingTheFillingEmail } from '../../../utils/utils';
import PasswordInput from '../PasswordInput/PasswordInput';

const PasswordRecoveryForm = (props) => {
    const [haveToken, setHaveToken] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' });

    const sendPassData = async (data) => {
        if (data.token) {
            return await userApi
                .resetPassWithToken(data.token, { password: data.password })
                .then((res) => localStorage.setItem('tokenParrot', res.token))
                .catch((error) => alert(error));
        } else {
            return await userApi
                .resetPass(data)
                .then(() => setHaveToken(true))
                .catch((error) => alert(error.message));
        }
    };

    return (
        <div className='form__wrapper'>
            <h2 className='form__title'>Восстановление пароля</h2>
            <form className='form__container' onSubmit={handleSubmit(sendPassData)}>
                <p className='form__info'>
                    Для получения временного пароля необходимо ввести email, указанный при
                    регистрации.
                </p>
                <div className='input__wrap'>
                    <input
                        type='email'
                        {...register('email', { ...checkingTheFillingEmail })}
                        placeholder='Email'
                        className={errors?.email ? 'form__input warning' : 'form__input'}
                    />
                    {errors?.email && (
                        <span className='warning__text'> {errors?.email.message}</span>
                    )}
                </div>
                {haveToken && (
                    <>
                        <div className='input__wrap'>
                            <input
                                className={errors?.text ? 'form__input warning' : 'form__input'}
                                type='text'
                                {...register('token', { ...checkingTheFillingEmail })}
                                placeholder='token'
                            />
                            {errors?.token && (
                                <span className='warning__text'> {errors?.token.message}</span>
                            )}
                        </div>
                        <div className='input__wrap'>
                            <PasswordInput register={register} errors={errors} />
                            {errors?.password && (
                                <span className='warning__text'> {errors?.password.message}</span>
                            )}
                        </div>
                    </>
                )}
                <p className='form__info'>Срок действия временного пароля 24 ч.</p>
                <button type='submit' className='form__btn form__btn-basic'>
                    Отправить
                </button>
            </form>
            <Link to='/auth'>
                <button className='form__btn'>Назад к авторизации</button>
            </Link>
        </div>
    );
};

export default PasswordRecoveryForm;
