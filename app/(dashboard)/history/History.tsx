"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "senderName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sender
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "receiverName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Receiver
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    accessorFn: (row) => row.status ? "Success" : "Failed",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    filterFn: (row, id, value) => {
      if (value === "all")
        return true;
      return row.original.status === (value === "true");
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.transactionId.toString())}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

export default function History() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([{ sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567890 }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567891 }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567892 }, { sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567890 }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567891 }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567892 }, { sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567890 }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567891 }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567892 }, { sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567890 }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567891 }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567892 }, { sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567890 }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567891 }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567892 }]);
  // const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // TODO Fetch transactions from API and remove test data

  }, []);

  return (
    <div className="flex flex-row justify-center">
      <Card className="dark max-w-[1000px] w-[80%] mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            { transactions.length === 0 ? loading ? <div>Loading...</div> : <div>No transactions</div> :
              <DataTable columns={columns} data={transactions} />
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
