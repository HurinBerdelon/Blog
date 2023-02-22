import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createClient } from 'prismicio'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { fetchCategories } from '@/services/fetchCategories'
import { Category } from '@/schema/Category'
import { useLogin } from '@/hooks/useLogin'
import { LoginModal } from '@/components/LoginModal'
import Image from 'next/image'
import Link from 'next/link'

interface NotFoundProps {
	sortedCategories: Category[]
}

export default function NotFound({ sortedCategories }: NotFoundProps) {

	const { t } = useTranslation()
	const { isLoginModalOpen, setIsLoginModalOpen } = useLogin()

	return (
		<>
			<Head>
				<title>Not Found | Hurin Blog</title>
				<meta name="description" content={t('common:generalMetaDescription')} />
			</Head>
			<Header sortedCategories={sortedCategories} />
			<main className="flex-1 flex items-center justify-center gap-10 flex-col">
				<Image src="/images/404_notFound.png" alt="404 not found" width={640} height={640} />
				<Link
					href="/category/all"
					className='hover:underline text-backgroundDark dark:text-textLight'
				>
					{t('common:notFound')}
				</Link>
				<LoginModal isOpen={isLoginModalOpen} onRequestClose={() => setIsLoginModalOpen(false)} />
			</main>
			<Footer sortedCategories={sortedCategories} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ previewData, locale }) => {
	const client = createClient({ previewData })

	if (!locale) locale = 'en'

	const sortedCategories = await fetchCategories()

	return {
		props: {
			sortedCategories,
			...(await serverSideTranslations(locale, ['common']))
		}
	}
}
