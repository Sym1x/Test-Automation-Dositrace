class ErrorHandler {
    constructor() {
        this.errors = [];
    }

    addCustomError(message) { // For custom messages (caught by .catch())
        if(message) this.errors.push(message);
    }
    addError(scenario) { // Add playwright's error message
        const message = scenario.result?.message;
        if(message) {
            const cleaned_message = message.replace(/\u001b\[[0-9;]*m/g, '');
            this.errors.push(cleaned_message.split("\n")[0]); // only the first line of the error, changeable
        }
    }


    final_err_message(){}
}