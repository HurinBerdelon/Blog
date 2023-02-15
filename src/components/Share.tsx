import { motion } from 'framer-motion'
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

    return (
        <section>
            <span className='font-semibold text-sm mb-2 block'>Share this Post</span>
            <ul className='flex gap-2'>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <FacebookShareButton url={postLink}>
                        <FacebookIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>Share on Facebook</span>
                    </FacebookShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <TwitterShareButton url={postLink}>
                        <TwitterIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>Share on Twitter</span>
                    </TwitterShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <EmailShareButton url={postLink}>
                        <EmailIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>Share on Email</span>
                    </EmailShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <LinkedinShareButton url={postLink}>
                        <LinkedinIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>Share on LinkedIn</span>
                    </LinkedinShareButton>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.1 }}
                >
                    <WhatsappShareButton url={postLink}>
                        <WhatsappIcon className='w-8 h-8 rounded' />
                        <span className='sr-only'>Share on WhatsApp</span>
                    </WhatsappShareButton>
                </motion.li>
            </ul>
        </section>
    )
}