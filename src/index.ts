export interface Env {
	VECTORIZE: Vectorize;
	AI: Ai;
}
interface EmbeddingResponse {
	shape: number[];
	data: number[][];
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		let path = new URL(request.url).pathname;
		if (path.startsWith('/favicon')) {
			return new Response('', { status: 404 });
		}

		// You only need to generate vector embeddings once (or as
		// data changes), not on every request
		if (path === '/insert') {
			// In a real-world application, you could read content from R2 or
			// a SQL database (like D1) and pass it to Workers AI
			const stories = [
				'Merchandising Management Languages: English & Spanish Technologies: Word, Excel, PPT, SAP, JDA, Retail Pro, XEIS-Raymark, LightSpeed, Workday, Micros, Salesforce & POS software Industries: Retail, Fashion, Sales, & Consumer Goods. Work Experience Brunello Cucinelli 1/2024 - Present Brand Manager • Responsible for the analysis of business reporting daily and weekly to determine the needs of the business. • Play an active supporting role on the development of all sales teams regarding selling',
				'business. • Play an active supporting role on the development of all sales teams regarding selling tools for positioned growth and progression. • Partner with buyers & wholesale team to maximize sales and margin goals. • Ensure shop presentation and visual standards are maintained according to brand standards. • Lead with an entrepreneurial drive-in order to think outside of the shop. • Payroll, Hiring, and training of staff. Marcus, 7/2022 – 1/2024 Store Manager Chicago • Manage specially',
				'Hiring, and training of staff. Marcus, 7/2022 – 1/2024 Store Manager Chicago • Manage specially curated designer brands in Women’s apparel, Accessories & Home Goods. • Lead with hiring and training of associates on product knowledge and sales. • Generated a clientele converting customers into a loyal client base while obtaining a 20% increase over LY. • Orchestrate the planning, driving, controlling store sales, and inventory needs to achieve store goals. • Manage schedules and payroll for a',
				'store sales, and inventory needs to achieve store goals. • Manage schedules and payroll for a staff of 5. • Spearhead the shipping, receiving, and all store operations. Brioni 8/2021 – 1/2022 (Contract) Store Manager Rosemont • Managed 20+ Luxury Men’s departments that include, Formalwear, Leisurewear & silk accessories. • Hire and train new staff while managing a Schedule and Payroll. • Provide excellent customer service while supervising all CRM & KPI initiatives. • Compliant with operational',
				'customer service while supervising all CRM & KPI initiatives. • Compliant with operational and company policies and procedures, ensuring that all policies are maintained & enforced. • Partnered with local groups and organizations to create store events that will broaden the client base. VERSACE 8/2015 – 6/2020 Versace Boutique Associate General Manager 3/2016 – 6/2020 Chicago • Promoted to assist with opening of the boutique on Rush St. to enthusiastically manage a staff of 6. • Managed 10+',
				'with opening of the boutique on Rush St. to enthusiastically manage a staff of 6. • Managed 10+ departments that included: Women’s and Men’s Bijoux, Home, Apparel, and Leather Goods. • Hired and trained new staff while managing a Schedule and Payroll. • Worked tirelessly to assist, inspire sales staff to meet and exceed set goals. • Provide excellent customer service while supervising all CRM initiatives. • Compliant with operational and company policies and procedures, ensuring that all',
				'initiatives. • Compliant with operational and company policies and procedures, ensuring that all policies are maintained & enforced. • Gained an understanding of both the leased and retail aspect of a luxury brand. • Worked with local groups and organizations to create store events that will broaden the client base. Versace Acting GM 5/2018 – 12/2018 (Contract) Managed both the Versace Boutique and Outlet Store in Aurora • Led and managed a staff of 6 with Business and Reporting. Versace Shop',
				'and Outlet Store in Aurora • Led and managed a staff of 6 with Business and Reporting. Versace Shop Manager 8/2015 – 1/2017 Managed both the Versace Boutique and Shop in Shop at Bloomingdales Bloomingdales Chicago • Responsible for the analysis of business reporting daily and weekly to determine the needs of the business. • Played an active supporting role on the development of the sales team in regard to selling tools for positioned growth and progression. • Partnered with wholesale team to',
				'regard to selling tools for positioned growth and progression. • Partnered with wholesale team to maximize sales and margin goals. • Ensure shop presentation and visual standards are maintained according to brand standards. • Laser focus on developing business strategies and targets, implementing sales incentives to help boost sales. • Payroll, Hiring, and training of staff. • Managed a staff of 1. Associate Store Manager 7/2013 – 7/2015 Gucci Rosemont • Support the adequate integration and',
				'of 1. Associate Store Manager 7/2013 – 7/2015 Gucci Rosemont • Support the adequate integration and optimization between front and back-office, ensuring appropriate store resources coverage, and supervising logistics and stock management. • Store operations, shipping and receiving. JDA and POS systems. • Loss Prevention Mgmt. Working both a fast and average pace environment I can juggle various projects at the same time. • Support the maintenance of stock and inventory accuracy, in line with',
				'projects at the same time. • Support the maintenance of stock and inventory accuracy, in line with corporate policies and procedures. • Public relations & local Advertising. • Encourage goal achievement as they relate to CRM, UPT’s, AUR’s and ADTs through regular touchbases. • Oversee all (27) departments such as Men’s and women’s Accessories (SLG’S), Handbags/Luggage, Shoes, MRTW, & WRTW. • Hiring and training of staff, Payroll & Manage a team of 15. Selling Department Specialist / Supervisor',
				'and training of staff, Payroll & Manage a team of 15. Selling Department Specialist / Supervisor 11/2005 - 4/2013 Burberry Ltd Chicago • Promoted to supervisor to serve as a motivational team/group leader for sales associates. Encouraged goal achievement as they relate to UPTS, AURs, CAV and return percentage. Possess excellent interpersonal skills in communicating with all levels of store personnel as well as clients. • Ensured merchandise was kept stocked and fronted in an appealing manner. •',
				"as well as clients. • Ensured merchandise was kept stocked and fronted in an appealing manner. • Recognized and monitored security issues during busy periods. • Built clientele to exceed individual sales goals and service. As a result, inducted into the elite million-dollar sales club and remained at the top of the sales team. • Worked within all departments under the Burberry brand and specialize in the Women's Apparel and Non-Apparel Departments. • Checking and organizing product inventory to",
				"in the Women's Apparel and Non-Apparel Departments. • Checking and organizing product inventory to better communicate inventory needs for profits. Advanced knowledge of POS and store systems. • Experienced with SAP, Word, Excel, POS systems, and daily iPad usage.",
				'better communicate inventory needs for profits. Advanced knowledge of POS and store systems. • Experienced with SAP, Word, Excel, POS systems, and daily iPad usage. Education International Academy of Merchandising & Design Chicago, IL Associate Degree in Merchandising Management Languages English & Spanish Technologies Word, Excel, PPT, SAP, JDA, Retail Pro, XEIS-Raymark, LightSpeed, Workday, Micros, Salesforce & POS software Industries Retail, Fashion, Sales, & Consumer Goods. Skills',
				'ELIUD CORONA Chicago, IL 60651 Email: eliud.corona@icloud.com | Phone: 312-369-9025 LinkedIn Profile: www.linkedin.com/in/eliud-c-597b415b Luxury Retail Manager Operations Management Team Management Business & Cost Analysis Interpersonal Skill Multi-Tasking Networking & Strategy Client Relationship Management Educational Background 2001 International Academy of M&D – Chicago, IL Associate degree Merchandising Management Languages: English & Spanish Technologies: Word, Excel, PPT, SAP, JDA,',
			];
			const modelResp: EmbeddingResponse = await env.AI.run('@cf/baai/bge-large-en-v1.5', {
				text: stories,
			});

			// Convert the vector embeddings into a format Vectorize can accept.
			// Each vector needs an ID, a value (the vector) and optional metadata.
			// In a real application, your ID would be bound to the ID of the source
			// document.
			let vectors: VectorizeVector[] = [];
			let id = 1;
			const session_id = '16:15';
			modelResp.data.forEach((vector, i) => {
				vectors.push({ id: `${id}-${session_id}`, values: vector, metadata: { session_id, text: stories[i] } });
				id++;
			});

			let inserted = await env.VECTORIZE.insert(vectors);
			return Response.json(inserted);
		}

		// Your query: expect this to match vector ID. 1 in this example
		let userQuery = 'whats the email address of Eliud Corona?';
		const queryVector: EmbeddingResponse = await env.AI.run('@cf/baai/bge-large-en-v1.5', {
			text: [userQuery],
		});

		let matches = await env.VECTORIZE.query(queryVector.data[0], {
			topK: 5,
			returnMetadata: 'all',
			returnValues: true,
			filter: { session_id: '16:15' },
		});
		return Response.json({
			// Expect a vector ID. 1 to be your top match with a score of
			// ~0.89693683
			// This tutorial uses a cosine distance metric, where the closer to one,
			// the more similar.
			matches: matches,
		});
	},
} satisfies ExportedHandler<Env>;
