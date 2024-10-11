// src/components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  transactionsPerPage: number;
  totalTransactions: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  transactionsPerPage,
  totalTransactions,
  paginate,
  currentPage,
}) => {
  const pageNumbers: number[] = [];
  const maxPagesVisible = 4;

  // Calcular cuántas páginas hay
  for (let i = 1; i <= Math.ceil(totalTransactions / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Calcular el rango de páginas visibles basado en la página actual
  const startPage = Math.max(currentPage - Math.floor(maxPagesVisible / 2), 1);
  const endPage = Math.min(startPage + maxPagesVisible - 1, pageNumbers.length);

  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <nav>
      <ul className="pagination">
        {/* Flecha de página anterior */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage - 1)} href="#" className="page-link">
            &laquo; {/* Flecha izquierda */}
          </a>
        </li>

        {/* Páginas visibles */}
        {visiblePages.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}

        {/* Flecha de página siguiente */}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <a onClick={() => paginate(currentPage + 1)} href="#" className="page-link">
            &raquo; {/* Flecha derecha */}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
