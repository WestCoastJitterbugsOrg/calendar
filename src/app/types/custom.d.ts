declare module '*.css' {
	const content: string[] | undefined;
	export default content;
}
declare module '*.module.scss' {
	const classNames: Record<'default', Record<string, string>>;
	export = classNames;
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
