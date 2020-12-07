function incrementPage(page) {
    return (previousState) => {
        return { ...previousState, page: page, currentPageNumber: +page.split('=').pop(), loading: true };
    };
};

export default incrementPage;
