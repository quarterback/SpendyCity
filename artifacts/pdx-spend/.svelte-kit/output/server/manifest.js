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
		client: {start:"_app/immutable/entry/start.Cq2TZhz9.js",app:"_app/immutable/entry/app.CBzxrRNl.js",imports:["_app/immutable/entry/start.Cq2TZhz9.js","_app/immutable/chunks/zRQYNAlM.js","_app/immutable/chunks/CnxF20uS.js","_app/immutable/chunks/Bd2mcGN2.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/entry/app.CBzxrRNl.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CnxF20uS.js","_app/immutable/chunks/au6XIfbZ.js","_app/immutable/chunks/DP0wnPvt.js","_app/immutable/chunks/CF1PKl5e.js","_app/immutable/chunks/CqxbtkIB.js","_app/immutable/chunks/C74gxGKZ.js","_app/immutable/chunks/DMvEfh6B.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/api/regenerate-memo",
				pattern: /^\/api\/regenerate-memo\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/regenerate-memo/_server.ts.js'))
			}
		],
		prerendered_routes: new Set(["/","/feed.xml","/funds/arts-tax/","/funds/pcef/","/funds/housing-investment/","/funds/rental-services/","/funds/affordable-housing-dev/","/funds/preschool-for-all/","/funds/supportive-housing/","/about/","/agent/","/dashboard/","/feed/","/implications/","/methodology/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
