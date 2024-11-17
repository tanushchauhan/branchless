"use client";

import CardDataStats from "@/components/CardDataStats";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
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
    accessorKey: "transactionTime",
    accessorFn: (row) => row.transactionTime.toLocaleString(),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.transactionId.toString())}
            >
              Copy transaction ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];

export default function History() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567890, transactionTime: new Date('2023-01-01T10:00:00Z') }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567891, transactionTime: new Date('2023-01-02T11:00:00Z') }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567892, transactionTime: new Date('2023-01-03T12:00:00Z') }, { sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567893, transactionTime: new Date('2023-01-04T13:00:00Z') }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567894, transactionTime: new Date('2023-01-05T14:00:00Z') }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567895, transactionTime: new Date('2023-01-06T15:00:00Z') }, { sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567896, transactionTime: new Date('2023-01-07T16:00:00Z') }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567897, transactionTime: new Date('2023-01-08T17:00:00Z') }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567898, transactionTime: new Date('2023-01-09T18:00:00Z') }, { sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567899, transactionTime: new Date('2023-01-10T19:00:00Z') }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567900, transactionTime: new Date('2023-01-11T20:00:00Z') }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567901, transactionTime: new Date('2023-01-12T21:00:00Z') }, { sender: "123", senderName: "John Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 2500, transactionId: 1234567902, transactionTime: new Date('2023-01-13T22:00:00Z') }, { sender: "456", senderName: "Jane Doe", receiver: "123", receiverName: "John Doe", status: false, amount: 5000, transactionId: 1234567903, transactionTime: new Date('2023-01-14T23:00:00Z') }, { sender: "789", senderName: "Alice Doe", receiver: "456", receiverName: "Jane Doe", status: true, amount: 1000, transactionId: 1234567904, transactionTime: new Date('2023-01-15T00:00:00Z') } ]);
  // const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // TODO Fetch transactions from API and remove test data
    setTimeout(() => setLoading(false), 500);
    fetch("/api/info").then(res => res.json()).then(console.log);
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <Card className="dark max-w-[1000px] w-[80%] mt-8">
        <CardHeader>
          <CardTitle className="text-xl">Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="pt-10">
            { loading ?
              <div className="grid grid-cols-1 gap-y-4">
                {
                  Array(8).fill(0).map((_, i) => <Skeleton key={i} className="w-full h-[50px]" />)
                }
              </div>
              : transactions.length === 0 ? <div>No transactions</div> :
              <div>
                <DataTable columns={columns} data={transactions} />
              </div>
            }
          </div>
        </CardContent>
      </Card>
      {/* <div className="grid grid-cols-1 h-[400px] w-[400px]">
        <CardDataStats title="Recent transactions" total={`$${transactions.filter(transaction => (Date.now() - transaction.transactionTime.getTime()) / 86400000 < 24).reduce((acc, transaction) => acc + transaction.amount * (transaction.receiver === "John Doe" ? 1 : -1), 0) }`} rate={`+${transactions.filter(transaction => (Date.now() - transaction.transactionTime.getTime()) / 86400000 < 24).length }`} levelUp>
          <div></div>
        </CardDataStats>
      </div> */}
    </div>
  );
}
