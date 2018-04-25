export const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const checkToDoFilters = (filterMode, itemStatus) => {

    if (filterMode === 0 && !itemStatus) {
        return true;
    }

    if (filterMode === 1 && itemStatus) {
        return true;
    }

    return filterMode === 2;
};