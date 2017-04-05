import { DirectClient } from 'pip-services-net-node';
import { ITagsClientV1 } from './ITagsClientV1';
import { ITagsBusinessLogic } from 'pip-services-Tags-node';
import { PartyTagsV1 } from './PartyTagsV1';
export declare class TagsDirectClientV1 extends DirectClient<ITagsBusinessLogic> implements ITagsClientV1 {
    constructor(config?: any);
    getTags(correlationId: string, partyId: string, callback: (err: any, partyTags: PartyTagsV1) => void): void;
    setTags(correlationId: string, partyTags: PartyTagsV1, callback: (err: any, partyTags: PartyTagsV1) => void): void;
    recordTags(correlationId: string, partyId: string, tags: string[], callback: (err: any, partyTags: PartyTagsV1) => void): void;
}
