import { ITagsClientV1 } from './ITagsClientV1';
import { PartyTagsV1 } from './PartyTagsV1';

export class TagsNullClientV1 implements ITagsClientV1 {

    public getTags(correlationId: string, partyId: string,
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        callback(null, new PartyTagsV1(partyId, []));
    }

    public setTags(correlationId: string, partyTags: PartyTagsV1,
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        if (callback) callback(null, partyTags);
    }
    
    public recordTags(correlationId: string, partyId: string, tags: string[],
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        if (callback) callback(null, new PartyTagsV1(partyId, []));
    }

}