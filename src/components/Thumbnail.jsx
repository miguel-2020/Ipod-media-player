

export default function Thumbnail({track}){
    return (
        <div className="thumbnail" data-power="power-OFF">
            <div className="thumbnail-image-wrapper">
            <img src="https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="music art" />

            </div>
            <div className="thumbnail__text-wrapper">
            <h1 style={{"--text-size":`-${track.title.length - 1}ch`}}>{track.title}</h1>
            <p>
                <small>{track.author}</small>
            </p>
            </div>
            
        </div>
    )
}