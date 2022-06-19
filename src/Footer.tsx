import githublogo from "./Github-Mark-32px.png";

export function Footer() {
  return (
    <div className="bg-black min-h-[16px] flex flex-wrap items-center justify-between p-4">
      <img src={githublogo.src}></img>
    </div>
  );
}
