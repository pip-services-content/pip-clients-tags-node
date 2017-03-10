let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaClient } from 'pip-services-runtime-node';

import { ITagsClient } from './ITagsClient';

export class TagsLambdaClient extends LambdaClient implements ITagsClient {       
	/**
	 * Unique descriptor for the TagsSenecaClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-tags", "lambda", "1.0"
	);
    
    constructor(config?: any) {
        super(TagsLambdaClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getTags(correlationId: string, partyId: string, callback) {
        callback = this.instrument(correlationId, 'tags.get_tags', callback);
                
        this.call(
            'get_tags', 
            {
                correlation_id: correlationId,
                party_id: partyId
            }, 
            callback
        );
    }

    public setTags(correlationId: string, partyId: string, tagRecords: any[], callback) {
        callback = this.instrument(correlationId, 'tags.set_tags', callback);

        this.call(
            'set_tags', 
            {
                correlation_id: correlationId,
                party_id: partyId,
                tags: tagRecords
            }, 
            callback
        );
    }

    public recordTags(correlationId: string, partyId: string, tags: string[], callback) {
        callback = this.instrument(correlationId, 'tags.record_tags', callback);

        this.call(
            'record_tags', 
            {
                correlation_id: correlationId,
                party_id: partyId,
                tags: tags
            }, 
            callback
        );
    }
    
}
