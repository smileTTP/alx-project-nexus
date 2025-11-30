import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxPageNumbersToShow?: number;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    maxPageNumbersToShow = 3,
}) => {
    const pageNumbers: (number | "...")[] = [];
    const halfLimit = Math.floor(maxPageNumbersToShow / 2);

    let startPage = Math.max(1, currentPage - halfLimit);
    let endPage = Math.min(totalPages, currentPage + halfLimit);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
        startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
        endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
    }

    if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
            pageNumbers.push("...");
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
    }

    const baseClasses = "mx-1 px-3 py-1 border-2 rounded-[10px] transition duration-200";
    const activeClasses = `${baseClasses} bg-[#4C3A51] text-[#f1d7de] border-[#4C3A51] hover:bg-[#4C3A51] hover:border-[#4C3A51]`;
    const inactiveClasses = `${baseClasses} bg-[#f1d7de] text-[#4C3A51] border-[#4C3A51] hover:bg-[#4C3A51] hover:text-[#f1d7de]`;
    const disabledClasses = `${baseClasses} bg-[#f1d7de] text-[#4C3A51] border-[#4C3A51] opacity-50 cursor-not-allowed`;
    const dotsClasses = "mx-1 px-3 py-1 text-[#f1d7de]";

    return (
        <div className="flex justify-center items-center my-8">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} 
            className={`${baseClasses} ${currentPage === 1 ? disabledClasses : inactiveClasses}`}>
            Previous
            </button>

            {pageNumbers.map((page, index) => {
                if (page === '...') {
                    return <span key={index} className={dotsClasses}>...</span>;
                }

                const pageNum = page as number;
                return (
                    <button key={index} onClick={() => onPageChange(pageNum)} className={`${baseClasses} ${pageNum === currentPage ? activeClasses : inactiveClasses}`}
                    aria-current={pageNum === currentPage ? 'page' : undefined}>
                    {pageNum}
                    </button>
                );
            })}

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
            className={`${baseClasses} ${currentPage === totalPages ? disabledClasses : inactiveClasses}`}>
            Next
            </button>
        </div>
    );
};

export default Pagination;