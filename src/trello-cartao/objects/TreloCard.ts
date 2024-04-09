import { ICover } from "./ICover";

export class TrelloCard {
    id: string;
    badges: IBadge;
    checkItemStates: any[];
    closed: boolean;
    dueComplete: boolean;
    dateLastActivity: Date;
    desc: string;
    due: Date | null;
    dueReminder: number | null;
    email: string | null;
    idBoard: string;
    idChecklists: string[];
    idList: string;
    idMembers: string[];
    idMembersVoted: string[];
    idShort: number;
    idAttachmentCover: string | null;
    labels: any[];
    idLabels: string[];
    manualCoverAttachment: boolean;
    name: string;
    pos: number;
    shortLink: string;
    shortUrl: string;
    start: Date | null;
    subscribed: boolean;
    url: string;
    cover: ICover;
    isTemplate: boolean;
    cardRole: string | null;
}