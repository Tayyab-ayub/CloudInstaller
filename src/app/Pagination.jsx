import React, { useState } from "react";
import Pagination from "react-js-pagination";




export default function Paginate({ totalItems, itemsPerPage, onPageChange, currentPage }) {

    return (
        <Pagination
            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={totalItems}
            pageRangeDisplayed={3}
            onChange={onPageChange}
            innerClass="flex space-x-2"
            itemClass="px-3 py-1 border rounded cursor-pointer"
            activeClass="bg-blue-600 text-white"
        />

    )
}