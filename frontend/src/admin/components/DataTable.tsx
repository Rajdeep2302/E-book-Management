import React from 'react';

export interface Column<T> {
    header: string;
    accessor: keyof T | ((item: T) => React.ReactNode);
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    isLoading?: boolean;
}

const DataTable = <T extends { _id?: string | number; id?: string | number } | any>({
    data,
    columns,
    onRowClick,
    isLoading = false
}: DataTableProps<T>) => {

    if (isLoading) {
        return (
            <div className="w-full text-center py-20 text-gray-500 animate-pulse">
                Loading data...
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-white/[0.05]">
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={`py-4 px-6 text-left text-xs font-bold text-gray-400 uppercase tracking-wider ${col.className || ''}`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="py-10 text-center text-gray-500">
                                No records found.
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr
                                key={(item as any).id || (item as any)._id || index}
                                onClick={() => onRowClick && onRowClick(item)}
                                className={`
                  border-b border-white/[0.02] 
                  ${onRowClick ? 'cursor-pointer hover:bg-white/[0.03]' : ''}
                  transition-colors duration-200
                `}
                            >
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="py-4 px-6 text-sm text-gray-300">
                                        {typeof col.accessor === 'function'
                                            ? col.accessor(item)
                                            : (item[col.accessor] as React.ReactNode)
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
