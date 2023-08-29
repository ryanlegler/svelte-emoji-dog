import { dictionary } from './dictionary';
import Fuse from 'fuse.js';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const search = data.get('search') as string;

		const rows = dictionary.map((entry: any) => ({
			...entry,
			related: [...new Set(entry?.related)].join(' ')
		}));

		const options = {
			includeScore: true,
			useExtendedSearch: true,
			keys: [
				{ name: 'name', getFn: (item: any) => item.name },
				{ name: 'gitmoji', getFn: (item: any) => item.gitmoji },
				{ name: 'description', getFn: (item: any) => item.description },
				{ name: 'keywords', getFn: (item: any) => item.keywords },
				{ name: 'related', getFn: (item: any) => item.related }
			]
		};

		const fuse = new Fuse(rows, options);
		const results = fuse.search(`'${search?.toLowerCase()}`);

		return { success: true, results, search };
	}
};
