let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { RestClient } from 'pip-services-runtime-node';

import { ITagsClient } from './ITagsClient';

export class TagsRestClient extends RestClient implements ITagsClient {       
	/**
	 * Unique descriptor for the TagsRestClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-tags", "rest", "1.0"
	);
    
    constructor(config?: any) {
        super(TagsRestClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getTags(correlationId: string, partyId: string, callback) {
        callback = this.instrument(correlationId, 'tags.get_tags', callback);
                        
        this.call('get', 
            '/tags/' + partyId,
            {
                correlation_id: correlationId                
            }, 
            callback
        );
    }

    public setTags(correlationId: string, partyId: string, tagRecords, callback) {
        callback = this.instrument(correlationId, 'tags.set_tags', callback);
                
        this.call('put', 
            '/tags/' + partyId,
            {
                correlation_id: correlationId                
            },
            { 
                tags: tagRecords
            }, 
            callback
        );
    }

    public recordTags(correlationId: string, partyId: string, tags: string[], callback) {
        callback = this.instrument(correlationId, 'tags.record_tags', callback);
        
        this.call('post', 
            '/tags/' + partyId,
            {
                correlation_id: correlationId                
            },
            { 
                tags: tags
            }, 
            callback
        );
    }

}
