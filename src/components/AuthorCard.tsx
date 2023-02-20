interface AuthorCardProps {
    author: any // TODO: remove this any
}

export function AuthorCard({ author }: AuthorCardProps): JSX.Element {
    return (
        <div>
            <div className="imageContainer">
                <img src="" alt="" />
            </div>
            <div>
                <span>Author</span>
                <span>Date</span>
            </div>
        </div>
    )
}