import { ComponentFactory } from 'pip-services-runtime-node';
import { DefaultFactory } from 'pip-services-runtime-node';

let Version1 = require('../version1');

export class TagsFactory extends ComponentFactory {
	public static Instance: TagsFactory = new TagsFactory();
	
	constructor() {
		super(DefaultFactory.Instance);

		this.register(Version1.TagsNullClient.Descriptor, Version1.TagsNullClient);
		this.register(Version1.TagsRestClient.Descriptor, Version1.TagsRestClient);
		this.register(Version1.TagsSenecaClient.Descriptor, Version1.TagsSenecaClient);
		this.register(Version1.TagsLambdaClient.Descriptor, Version1.TagsLambdaClient);
	}
	
}
