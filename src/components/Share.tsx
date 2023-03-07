import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share'

interface ShareProps {
    postLink: string
    title: string
}

export function Share({ postLink, title }: ShareProps): JSX.Element {
    console.log({ postLink })

    const { t } = useTranslation()

    return (
        <section>
            <span className='font-semibold text-sm mb-2 block'>{t('common:shareThisPost')}</span>
            <ul className='flex gap-2'>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <FacebookShareButton url={postLink} quote={title}>
                        <FacebookIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>{`${t('common:shareOn')} Facebook`}</span>
                    </FacebookShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <TwitterShareButton url={postLink} title={title}>
                        <TwitterIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>{`${t('common:shareOn')} Twitter`}</span>
                    </TwitterShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <LinkedinShareButton url={postLink} title={title} source={"blog.hurinberdelon.com"}>
                        <LinkedinIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>{`${t('common:shareOn')} LinkedIn`}</span>
                    </LinkedinShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <WhatsappShareButton url={postLink} title={title}>
                        <WhatsappIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>{`${t('common:shareOn')} WhatsApp`}</span>
                    </WhatsappShareButton>
                </motion.li>
            </ul>
        </section>
    )
}