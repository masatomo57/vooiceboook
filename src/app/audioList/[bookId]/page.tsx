const AudioListEveryBookContents = ({ params }: { params: { bookId : string }}) => {
    return (
        <div>
            <h1>書籍別の音声一覧ページ</h1>
            <p>書籍ID : { params.bookId }</p>
        </div>
    )
}

export default AudioListEveryBookContents