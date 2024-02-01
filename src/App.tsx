import * as React from "react";
import "./App.css";
import "./index.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Table as BTable } from "react-bootstrap";

type Expènses = {
  id: string;
  date: string;
  amount: number;
  description: string;
};

const defaultData: Expènses[] = [
  {
    id: "001",
    date: "2023/01/01",
    amount: -100,
    description: "おにぎり",
  },
  {
    id: "002",
    date: "2023/01/05",
    amount: -80,
    description: "お茶",
  },
  {
    id: "003",
    date: "2023/01/11",
    amount: 5000,
    description: "こづかい",
  },
  {
    id: "004",
    date: "2023/01/15",
    amount: -500,
    description: "おやつ",
  },
  {
    id: "005",
    date: "2023/01/21",
    amount: -1000,
    description: "おもちゃ",
  },
];

const columnHelper = createColumnHelper<Expènses>();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.date, {
    id: "date",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => "Date",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("amount", {
    header: () => "Amount",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("description", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
];

function App() {
  const [data] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <BTable striped bordered hover responsive size="sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </BTable>
      <div className="h-4" />
      <Button onClick={() => rerender()} className="border p-2">
        Click me
      </Button>
    </div>
  );
}

export default App;
