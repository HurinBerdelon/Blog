'use client'
import { Dialog } from '@headlessui/react'
import { GoogleLogo, X } from 'phosphor-react'
import { signIn } from 'next-auth/react'
import { useUser } from '@/hooks/useUser'
import { useTranslation } from '@/hooks/useTranslation'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface LoginModalProps {
    isOpen: boolean
    onRequestClose: () => void
}

export function LoginModal({ isOpen, onRequestClose }: LoginModalProps): JSX.Element {
    const { setPath } = useUser()
    const { t } = useTranslation()
    const params = useParams()
    const lang = (params?.lang as string) ?? 'en'

    function handleLogin() {
        setPath()
        signIn('google', { callbackUrl: `/${lang}/login_callback` })
    }

    return (
        <Dialog open={isOpen} onClose={onRequestClose}>
            <div className="fixed inset-0 z-10 bg-black opacity-75" />
            <Dialog.Panel className="fixed px-4 py-10 w-96 flex z-20 flex-col items-center gap-4 rounded top-[50%] text-backgroundDark dark:text-textLight translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white dark:bg-backgroundDark">
                <button
                    className="absolute top-3 right-3 text-xl hover:brightness-90"
                    onClick={onRequestClose}
                >
                    <X className="text-backgroundDark dark:text-textLight" />
                </button>
                <div>
                    <Image
                        src="/images/fernandoCardozoLogo.svg"
                        alt={t('common:blogLogo')}
                        width={100}
                        height={100}
                        loading="eager"
                    />
                </div>
                <Dialog.Title className="text-lg font-medium">{t('common:welcome')}</Dialog.Title>
                <Dialog.Description className="p-2 text-justify">
                    {t('common:loginToInteract')}
                </Dialog.Description>
                <button
                    className="flex gap-2 items-center px-2 py-1 font-medium rounded bg-greenBrand dark:bg-greenBrandDark text-textLight hover:brightness-90"
                    onClick={handleLogin}
                >
                    <GoogleLogo />
                    {t('common:loginWithGoogle')}
                </button>
            </Dialog.Panel>
        </Dialog>
    )
}
