export function Comment(): JSX.Element {
    return (
        <div>
            <div className="commentHeader">
                    <span>Name</span>
                    <span>Date</span>
            </div>
            <div className="content">Message</div>
            <div className="likes">
                <span>Icon</span>
                <span>30</span>
            </div>
        </div>
    )
}