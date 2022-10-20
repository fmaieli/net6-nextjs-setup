import Head from 'next/head'
const colorStyle = "#F0F0F0"
export const MainContainer = ({ children }) => {
  return (
    <div>
      <Head>
        <style>{`body {background-color: ${colorStyle};`}</style>
      </Head>
      <div className="h-full w-full mx-auto text-center font-sans">{children}</div>
    </div>
  )
}
