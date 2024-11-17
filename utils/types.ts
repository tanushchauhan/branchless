interface Transaction {
  sender: string;
  senderName: string;
  receiver: string;
  receiverName: string;
  success: boolean;
  amount: number;
  id: number;
  created_at: string;
}