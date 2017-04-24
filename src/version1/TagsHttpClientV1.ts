import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableHttpClient } from 'pip-services-net-node';

import { PartyTagsV1 } from './PartyTagsV1';
import { ITagsClientV1 } from './ITagsClientV1';

export class TagsHttpClientV1 extends CommandableHttpClient implements ITagsClientV1 {

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
