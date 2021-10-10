import "./spinner.css";

export function SpinLoader() {
  return (
    <>
      <div className="bg-wcj-black h-16 flex-none"></div>
      <div className="flex h-screen justify-center items-center bg-wcj-sand">
        <div className="spinner"></div>
      </div>
    </>
  );
}