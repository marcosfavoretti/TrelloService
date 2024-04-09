interface IBadge {
    attachmentsByType: { [key: string]: any };
    location: boolean;
    votes: number;
    viewingMemberVoted: boolean;
    subscribed: boolean;
    fogbugz: string;
    checkItems: number;
    checkItemsChecked: number;
    checkItemsEarliestDue: Date | null;
    comments: number;
    attachments: number;
    description: boolean;
    due: Date | null;
    dueComplete: boolean;
    start: Date | null;
}