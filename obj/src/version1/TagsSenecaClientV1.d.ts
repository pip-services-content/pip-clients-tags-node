import { CommandableSenecaClient } from 'pip-services-seneca-node';
import { PartyTagsV1 } from './PartyTagsV1';
import { ITagsClientV1 } from './ITagsClientV1';
export declare class TagsSenecaClientV1 extends CommandableSenecaClient implements ITagsClientV1 {
    constructor(config?: any);
    getTags(correlationId: string, partyId: string, callback: (err: any, partyTags: PartyTagsV1) => void): void;
    setTags(correlationId: string, partyTags: PartyTagsV1, callback: (err: any, partyTags: PartyTagsV1) => void): void;
    recordTags(correlationId: string, partyId: string, tags: string[], callback: (err: any, partyTags: PartyTagsV1) => void): void;
}
