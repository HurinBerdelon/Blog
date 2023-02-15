import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    EmailShareButton,
    EmailIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share'

interface ShareProps {
    postLink: string
}

export function Share({ postLink }: ShareProps): JSX.Element {

    const { t } = useTranslation()

    return (
        <section>
            <span className='font-semibold text-sm mb-2 block'>{t('common:shareThisPost')}</span>
            <ul className='flex gap-2'>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <FacebookShareButton url={postLink}>
                        <FacebookIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>{`${t('common:shareOn')} Facebook`}</span>
                    </FacebookShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <TwitterShareButton url={postLink}>
                        <TwitterIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>{`${t('common:shareOn')} Twitter`}</span>
                    </TwitterShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <EmailShareButton url={postLink}>
                        <EmailIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>{`${t('common:shareOn')} Email`}</span>
                    </EmailShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <LinkedinShareButton url={postLink}>
                        <LinkedinIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>{`${t('common:shareOn')} LinkedIn`}</span>
                    </LinkedinShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <WhatsappShareButton url={postLink}>
                        <WhatsappIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>{`${t('common:shareOn')} WhatsApp`}</span>
                    </WhatsappShareButton>
                </motion.li>
            </ul>
        </section>
    )
}