interface ICreate {
    title:  string;
    description: string;
    final_date: Date;
    user_id: string;
    priority_id: string;
    card_id: string;
}

interface IUpdate {
    title:  string;
    description: string;
    final_date: Date;
    priority_id: string;
    card_id: string;
}



export type { ICreate }
export type { IUpdate }