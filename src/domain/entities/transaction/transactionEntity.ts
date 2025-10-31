export interface Transaction{
    id: string;
    user_id: string;
    amount: number;
    ppob_id?: string;
    transaction_type: 'TOPUP' | 'PAYMENT';
    created_at?: Date;
}