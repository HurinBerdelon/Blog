import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

				<link rel="icon" href="/images/logo.svg" />
				<script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=hurinberdelon-blog"></script>
				<meta name="description" content="Fernando Cardozo's blog to talk about technology and programming, with focus on frontend development. Talking about React, NextJS, Typescript and some other tech subjects." />
			</Head>
			<body className='min-h-full'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
