'use client'

import {useSearchParams, useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import { authStorageService } from '@/services/storege/authStorage'
import {exchangeCodeForKey} from "@/services/authService"
import Button from '@/shared/ui/button/button'
import Link from 'next/link'
import { routes } from "@/shared/config/routes"

import styles from './callbackpage.module.scss'

export default function CallbackPage() {

    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const verifierCode = authStorageService.getVerifier()
    const router = useRouter()
    const [error, setError] = useState('')
    

    useEffect(() => {
        if(code && !verifierCode) {
            setError('Сессия входа истекла, пожалуйста, попробуйте снова.')
            return 
        }
            
        if(code && verifierCode) {
            const exchange = async () => {
                try {
                    const userKey =  await exchangeCodeForKey(code,verifierCode, 'S256')
                    document.cookie = `auth_token=${userKey}; max-age=604800; path=/`;
                    authStorageService.clearVerifier()
                    router.push(routes.home())
                } catch(error) {
                    console.error('Ошибка при обмене кода на ключ:', error)
                    setError('Ошибка авторизации. Не удалось получить API-ключ.')
                } 
            }

            exchange() 
        }

    },[code, verifierCode, router])

    return (
        <>
            {!error ? (
                    <section className={styles.callback}>
                        <div className={styles.callback__spinner} />
                        <p className={styles.callback__text}>
                            Авторизация...
                        </p>
                    </section>        
                ) : (
                    <section className={styles.callback}>
                        <p className={styles.callback__text}>{error}</p> 
                        <Link href={routes.login()}>
                            <Button>Login again</Button>
                        </Link>
                    </section>       
            )}
    </> 
    )
}