export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","og-default.png","og-default.svg","voice.md"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".md":"text/markdown"},
	_: {
		client: {start:"_app/immutable/entry/start.DNBiuAMF.js",app:"_app/immutable/entry/app.BK_QUmYa.js",imports:["_app/immutable/entry/start.DNBiuAMF.js","_app/immutable/chunks/W2eTT4MZ.js","_app/immutable/chunks/CHZgNL1i.js","_app/immutable/chunks/DbAGQcQp.js","_app/immutable/entry/app.BK_QUmYa.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CHZgNL1i.js","_app/immutable/chunks/BKPCqZLa.js","_app/immutable/chunks/DuV2ahUi.js","_app/immutable/chunks/BBgXoWX6.js","_app/immutable/chunks/pm6gYX7-.js","_app/immutable/chunks/B1Ydvh53.js","_app/immutable/chunks/aT5hTAzA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/agent",
				pattern: /^\/agent\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/regenerate-memo",
				pattern: /^\/api\/regenerate-memo\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/regenerate-memo/_server.ts.js'))
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/feed.xml",
				pattern: /^\/feed\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/feed.xml/_server.ts.js'))
			},
			{
				id: "/feed",
				pattern: /^\/feed\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/funds/[slug]",
				pattern: /^\/funds\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/implications",
				pattern: /^\/implications\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/methodology",
				pattern: /^\/methodology\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
