export default function Error({ message }: { message: unknown }) {
  return (
    <div className="container m-auto my-8">
      <h1 className="text-accented text-2xl font-bold underline">
        Error while loading data!
      </h1>
      <p className="font-bold">Got the following error:</p>
      <pre className="font-mono">{getError(message)}</pre>
    </div>
  );
}

function getError(error: unknown): string | undefined {
  switch (typeof error) {
    case "boolean":
    case "number":
    case "bigint":
    case "string":
    case "symbol":
    case "undefined":
      return getToStringableError(error);
    case "object":
      return JSON.stringify(error, null, 4);
    case "function":
      return getError(error());
    default:
      return;
  }
}

function getToStringableError(
  error: boolean | number | bigint | string | symbol | undefined
): string {
  try {
    return JSON.stringify(JSON.parse(error?.toString?.() ?? ""), null, 4);
  } catch {
    return error?.toString?.() ?? "Unknown error";
  }
}
