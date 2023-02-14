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
            <span className='font-semibold mb-2 block'>Share this Post</span>
            <ul className='flex gap-2'>
                <li>
                    <FacebookShareButton url={postLink}>
                        <FacebookIcon className='w-10 h-10 rounded' />
                        <span className='sr-only'>Share on Facebook</span>
                    </FacebookShareButton>
                </li>
                <li>
                    <TwitterShareButton url={postLink}>
                        <TwitterIcon className='w-10 h-10 rounded' />
                        <span className='sr-only'>Share on Twitter</span>
                    </TwitterShareButton>
                </li>
                <li>
                    <EmailShareButton url={postLink}>
                        <EmailIcon className='w-10 h-10 rounded' />
                        <span className='sr-only'>Share on Email</span>
                    </EmailShareButton>
                </li>
                <li>
                    <LinkedinShareButton url={postLink}>
                        <LinkedinIcon className='w-10 h-10 rounded' />
                        <span className='sr-only'>Share on LinkedIn</span>
                    </LinkedinShareButton>
                </li>
                <li>
                    <WhatsappShareButton url={postLink}>
                        <WhatsappIcon className='w-10 h-10 rounded' />
                        <span className='sr-only'>Share on WhatsApp</span>
                    </WhatsappShareButton>
                </li>
            </ul>
        </section>
    )
}