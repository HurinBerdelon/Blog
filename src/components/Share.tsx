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
        <ul>
            <li>
                <FacebookShareButton url={postLink}>
                    <FacebookIcon />
                    <span className='sr-only'>Share on Facebook</span>
                </FacebookShareButton>
            </li>
            <li>
                <TwitterShareButton url={postLink}>
                    <TwitterIcon />
                    <span className='sr-only'>Share on Twitter</span>
                </TwitterShareButton>
            </li>
            <li>
                <EmailShareButton url={postLink}>
                    <EmailIcon />
                    <span className='sr-only'>Share on Email</span>
                </EmailShareButton>
            </li>
            <li>
                <LinkedinShareButton url={postLink}>
                    <LinkedinIcon />
                    <span className='sr-only'>Share on LinkedIn</span>
                </LinkedinShareButton>
            </li>
            <li>
                <WhatsappShareButton url={postLink}>
                    <WhatsappIcon />
                    <span className='sr-only'>Share on WhatsApp</span>
                </WhatsappShareButton>
            </li>
        </ul>
    )
}