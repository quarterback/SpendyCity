export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","og-default.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.B1K0F0qg.js",app:"_app/immutable/entry/app.Ck-0c_ws.js",imports:["_app/immutable/entry/start.B1K0F0qg.js","_app/immutable/chunks/2-xBZ9Gh.js","_app/immutable/chunks/CnxF20uS.js","_app/immutable/chunks/3D4cMBOt.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/entry/app.Ck-0c_ws.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CnxF20uS.js","_app/immutable/chunks/au6XIfbZ.js","_app/immutable/chunks/DP0wnPvt.js","_app/immutable/chunks/CF1PKl5e.js","_app/immutable/chunks/CqxbtkIB.js","_app/immutable/chunks/C74gxGKZ.js","_app/immutable/chunks/DMvEfh6B.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
