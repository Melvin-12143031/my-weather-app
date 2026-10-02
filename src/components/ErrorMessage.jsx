const ErrorMessage = ({
    message,
    onRetry,
    loading }) => {

    if (!message) {
        return null
    }

    return (
        <div className="alert alert-danger">
            <p>{message}</p>

            <button
                className="retry-button"
                onClick={onRetry}
                disabled={loading}
            >
                {loading ? "Trying again..." : "Try Again"}
            </button>
        </div>
    )
}

export default ErrorMessage
