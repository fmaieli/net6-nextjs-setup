import Head from 'next/head'

export const Container = ({ children }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="sm:max-w-[72rem] xl:max-w-screen-2xl min-h-[8rem] shadow-2xl bg-white rounded-lg m-auto text-center p-8 mt-4 mx-3">
        {children}
      </div>
    </div>
  )
}
