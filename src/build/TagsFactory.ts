import { Descriptor } from 'pip-services-commons-node';
import { Factory } from 'pip-services-commons-node';

import { TagsNullClientV1 } from '../version1/TagsNullClientV1';
import { TagsDirectClientV1 } from '../version1/TagsDirectClientV1';
import { TagsHttpClientV1 } from '../version1/TagsHttpClientV1';
import { TagsSenecaClientV1 } from '../version1/TagsSenecaClientV1';

export class TagsFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-tags', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-tags', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-tags', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-tags', 'client', 'http', 'default', '1.0');
	public static SenecaClientV1Descriptor = new Descriptor('pip-services-tags', 'client', 'seneca', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(TagsFactory.NullClientV1Descriptor, TagsNullClientV1);
		this.registerAsType(TagsFactory.DirectClientV1Descriptor, TagsDirectClientV1);
		this.registerAsType(TagsFactory.HttpClientV1Descriptor, TagsHttpClientV1);
		this.registerAsType(TagsFactory.SenecaClientV1Descriptor, TagsSenecaClientV1);
	}
	
}
