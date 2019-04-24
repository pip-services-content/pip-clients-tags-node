import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableLambdaClient } from 'pip-services3-aws-node';

import { PartyTagsV1 } from './PartyTagsV1';
import { ITagsClientV1 } from './ITagsClientV1';

export class TagsLambdaClientV1 extends CommandableLambdaClient implements ITagsClientV1 {

    constructor(config?: any) {
        super('tags');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public getTags(correlationId: string, partyId: string,
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        this.callCommand(
            'get_tags',
            correlationId,
            {
                party_id: partyId
            },
            callback
        );
    }

    public setTags(correlationId: string, partyTags: PartyTagsV1,
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        this.callCommand(
            'set_tags',
            correlationId,
            {
                party_tags: partyTags
            },
            callback
        );
    }
    
    public recordTags(correlationId: string, partyId: string, tags: string[],
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        this.callCommand(
            'record_tags',
            correlationId,
            {
                party_id: partyId,
                tags: tags
            },
            callback
        );
    }
    
}
