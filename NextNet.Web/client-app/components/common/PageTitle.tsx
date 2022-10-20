import Head from 'next/head'

export const PageTitle = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="text-left ml-11 text-3xl font-bold font-sans">{props.titlePage}</h1>
    </>
  )
}
