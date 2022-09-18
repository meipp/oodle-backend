import { PollResponse } from "./pollresponse.interface";

export interface Poll {
    title: string;
    description?: string;
    id: string;
    x: string[];
    y?: string[];
    responses: PollResponse[];
}
