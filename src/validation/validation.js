export function validateForm(data, isError) {
    const errors = {
        title: "",
        description: "",
        dates: []
    };
    let isFormValid;

    if (isError) {
        isFormValid = true;

        if (data.title.length > 100) {
            errors.title = "Title must be less than 100 characters";
            isFormValid = false;
        }

        if (!data.title.length) {
            errors.title = "Title must have at least one character";
            isFormValid = false;
        }

        if (data.description.length > 500) {
            errors.description = "Description must be less than 500 characters";
            isFormValid = false;
        }

        if (!data.description.length) {
            errors.description = "Description must have at least one character";
            isFormValid = false;
        }

        data.data.forEach((entry, index) => {
            const dateErrors = {
                date: "",
                starttime: "",
                endtime: "",
                type: "",
                price: ""
            };

            if (!entry.date) {
                dateErrors.date = "Date is required";
                isFormValid = false;
            }
            if (!entry.starttime) {
                dateErrors.starttime = "Start time is required";
                isFormValid = false;
            }
            if (!entry.endtime) {
                dateErrors.endtime = "End time is required";
                isFormValid = false;
            }
            if (entry.endtime <= entry.starttime) {
                dateErrors.endtime = "End time must be later than start time";
                isFormValid = false;
            }
            if (!entry.type) {
                dateErrors.type = "Type is required";
                isFormValid = false;
            }
            if (entry.price === null) {
                dateErrors.price = "Price is required";
                isFormValid = false;
            }

            errors.dates.push(dateErrors);
        });
    }

    return { errors, isFormValid};
}
