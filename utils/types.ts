interface Transaction {
  sender: string;
  senderName: string;
  receiver: string;
  receiverName: string;
  status: boolean;
  amount: number;
  transactionId: number;
}