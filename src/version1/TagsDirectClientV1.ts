import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams} from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { DirectClient } from 'pip-services-net-node';

import { ITagsClientV1 } from './ITagsClientV1';
import { ITagsBusinessLogic } from 'pip-services-Tags-node';
import { PartyTagsV1 } from './PartyTagsV1';

export class TagsDirectClientV1 extends DirectClient<ITagsBusinessLogic> implements ITagsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("pip-services-tags", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getTags(correlationId: string, partyId: string,
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        let timing = this.instrument(correlationId, 'tags.get_tags');
        this._controller.getTags(correlationId, partyId, (err, partyTags) => {
            timing.endTiming();
            callback(err, partyTags);
        });
    }

    public setTags(correlationId: string, partyTags: PartyTagsV1,
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        let timing = this.instrument(correlationId, 'tags.set_tags');
        this._controller.setTags(correlationId, partyTags, (err, partyTags) => {
            timing.endTiming();
            callback(err, partyTags);
        });
    }
    
    public recordTags(correlationId: string, partyId: string, tags: string[],
        callback: (err: any, partyTags: PartyTagsV1) => void): void {
        let timing = this.instrument(correlationId, 'tags.record_tags');
        this._controller.recordTags(correlationId, partyId, tags, (err, partyTags) => {
            timing.endTiming();
            callback(err, partyTags);
        });
    }

}