export const buttonClassName = (size: string) =>
  `bg-wcj-red text-white font-bold text-base leading-4
   rounded-full no-underline inline-block
   transition-colors hover:bg-wcj-red-hover
   ${size === "sm" ? "px-3 py-1" : size === "lg" ? "px-6 py-3" : "px-4 py-2"}
   `;
