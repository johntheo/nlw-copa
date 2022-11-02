import {Html, Head, Main, NextScript} from 'next/document'

/*
- In the next .tsx files it is important to use camelCase for defining the html properties.
`crossorign`-> `crossOrigin`
`onclick`->`onClick`
- Every tag html need to be closed. Mainly the one line ones. Example `<link rel="" href="">`->`<link rel="" href="" />`
- Every parameter need to have a value. Example `< ... crossOrigin>`-> `< ... crossOrigin="">`
*/
export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
            </Head>
            <body className="bg-gray-900 bg-app bg-no-repeat bg-cover">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
