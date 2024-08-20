import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import styles from "./Paginator.module.css";

interface PaginatorProps {
    items: T[];
    maxRows?: number;
    pageComponent: React.FC<{ items: T[] }>;
}

const Paginator = <T,>({ items, maxRows, pageComponent: PageComponent, ...pageCompProps }: PaginatorProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage: number = maxRows || items.length;
  const totalPages: number = Math.ceil(items.length / itemsPerPage);
  const paginatedItems: T[] = items.slice(
    currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <PageComponent items={paginatedItems} {...pageCompProps} />

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={handlePreviousPage} disabled={currentPage === 0}>
            <FaAngleLeft />
          </button>
          <h3>Page {currentPage + 1} of {totalPages}</h3>
          <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
            <FaAngleRight />
          </button>
        </div>
      )}
    </>
  );
}

export default Paginator;
