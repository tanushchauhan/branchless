"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/DataTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
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
    accessorKey: "created_at",
    accessorFn: (row) => new Date(row.created_at).toLocaleString(),
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
    accessorKey: "success",
    accessorFn: (row) => row.success ? "Success" : "Failed",
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
      return row.original.success === (value === "true");
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
              onClick={() => navigator.clipboard.writeText(payment.id.toString())}
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/transactions").then(res => res.json()).then(data => data.error ? router.push("/") : data).then(setTransactions).finally(() => setLoading(false));
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
