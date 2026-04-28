export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.-jCouJyh.js",app:"_app/immutable/entry/app.CoakY3re.js",imports:["_app/immutable/entry/start.-jCouJyh.js","_app/immutable/chunks/BwIi6QXd.js","_app/immutable/chunks/CXLDUKcu.js","_app/immutable/chunks/J02zB2Fb.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/entry/app.CoakY3re.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CXLDUKcu.js","_app/immutable/chunks/CAeyNYap.js","_app/immutable/chunks/DTmN85vv.js","_app/immutable/chunks/CrvE5QRZ.js","_app/immutable/chunks/DP51QsYD.js","_app/immutable/chunks/BMLf9AI7.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/","/funds/arts-tax/","/funds/pcef/","/funds/housing-investment/","/funds/rental-services/","/funds/affordable-housing-dev/","/funds/preschool-for-all/","/funds/supportive-housing/","/about/","/agent/","/dashboard/","/feed/","/implications/","/methodology/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
