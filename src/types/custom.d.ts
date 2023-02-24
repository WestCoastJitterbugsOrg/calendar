declare module '*.css' {
	const content: string[] | undefined;
	export default content;
}
declare module '*.module.scss' {
	const classes: Record<string, string>;
	export default classes;
}
declare module '*.png' {
	const content: string | undefined;
	export default content;
}
declare module '*.jpg' {
	const content: string | undefined;
	export default content;
}
declare module '*.jpeg' {
	const content: string | undefined;
	export default content;
}
declare module '*.gif' {
	const content: string | undefined;
	export default content;
}
declare module '*.svg' {
	const content: string | undefined;
	export default content;
}
declare namespace wpCwfc {
	const ajaxUrl: string;
	const org: string;
	const pwHash: string;
	const colors: Record<string, string>;
	export { ajaxUrl, org, pwHash, colors };
}
