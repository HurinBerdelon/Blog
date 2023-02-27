import Script from "next/script"

export function GoogleAnalytic(): JSX.Element {
    return (
        <>
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} id="analyticLoading" />

            <Script strategy="lazyOnload" id="analytics">
                {`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
					    page_path: window.location.pathname,
					});
				`}
            </Script>
        </>
    )
}