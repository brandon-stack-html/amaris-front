/* eslint-disable @typescript-eslint/no-explicit-any */
interface TableProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T }[];
  actionLabel?: string; // Hacer opcional
  onActionClick?: (item: T) => void; // Hacer opcional
}

const Table = <T,>({ data, columns, actionLabel, onActionClick }: TableProps<T>) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor as string}>{column.header}</th>
          ))}
          {actionLabel && <th>Acción</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}> {/* Cambiado a index para evitar problemas con fundId */}
            {columns.map((column) => (
              <td key={column.accessor as string}>{(item as any)[column.accessor]}</td>
            ))}
            {onActionClick && actionLabel && (
              <td>
                <button 
                  className="action-button" 
                  onClick={() => onActionClick(item)}
                >
                  {actionLabel}
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
