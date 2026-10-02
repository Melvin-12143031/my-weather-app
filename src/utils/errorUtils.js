import ErrorMessage from "../components/ErrorMessage"

const getErrorMessage = (error) => {

    if(!error) {
        return "Something went wrong."
    };

    if (error === "Failed to fetch") {
        return "Please check your internet connection."
    };

    return error.message;

}

export default getErrorMessage;
