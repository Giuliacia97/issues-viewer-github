import { useState } from "react";

const PageHook = () => {
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        // setActivePage(activePage);
    }

    return {
        handlePageChange,
        activePage
      };
    };
    
    export default PageHook;