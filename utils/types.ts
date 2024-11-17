interface Transaction {
  sender: string;
  sender_name: string;
  receiver: string;
  receiver_name: string;
  success: boolean;
  amount: number;
  id: number;
  created_at: string;
}