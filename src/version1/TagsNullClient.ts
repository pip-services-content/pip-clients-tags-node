import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { AbstractClient } from 'pip-services-runtime-node';

import { ITagsClient } from './ITagsClient';

export class TagsNullClient extends AbstractClient implements ITagsClient {       
	/**
	 * Unique descriptor for the TagsRestClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-tags", "null", "1.0"
	);
    
    constructor(config?: any) {
        super(TagsNullClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getTags(correlationId: string, partyId: string, callback) {
        if (callback) callback(null, []);
    }

    public setTags(correlationId: string, partyId: string, tagRecords: any[], callback) {
        if (callback) callback(null, tagRecords || []);
    }

    public recordTags(correlationId: string, partyId, tags, callback) {
        if (callback) callback(null, []);
    }
    
}
