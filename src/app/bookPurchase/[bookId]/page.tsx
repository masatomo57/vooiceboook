const AudioListEveryBookContents = ({ params }: { params: { bookId : string }}) => {
    return (
        <div>
            <h1>書籍購入ページ</h1>
            <p>書籍ID : { params.bookId }</p>
        </div>
    )
}

export default AudioListEveryBookContents