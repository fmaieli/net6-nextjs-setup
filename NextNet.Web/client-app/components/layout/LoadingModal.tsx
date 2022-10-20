import LoadingGif from '../layout/gifLoading/loading.gif';

export const LoadingModal = () => {
    return (
        <div className="flex h-screen" style={{backgroundColor:"#F0F0F0"}}>
            <div className="m-auto overflow-hidden">
                <img src={LoadingGif.src} alt="Cargando.." className="mx-auto rounded-[20px]" style={{objectFit: 'cover', marginTop: '-1px', marginBottom: '-1px', width:'400px', height: '250px'}}/>
            </div>
        </div>
    )
}