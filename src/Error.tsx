import { useEffect } from "react";

type ToStringable = boolean | number | bigint | string | symbol;

export default function ErrorViewer({ message }: { message: unknown }) {
  useEffect(() => {
    console.error(message);
  });
  return (
    <div className="container m-auto p-5">
      <h1 className="text-accented text-2xl font-bold">
        Error while loading data!
      </h1>
      <pre className="font-mono" data-testid="error-message">
        {getError(message)}
      </pre>
    </div>
  );
}

function getError(error: unknown): string | undefined {
  if (typeof error === "object") {
    if (error instanceof Error) {
      return error.toString();
    }
    return JSON.stringify(error, null, 4);
  } else {
    return getToStringableError(error as ToStringable | undefined);
  }
}

function getToStringableError(error: ToStringable | undefined): string {
  try {
    return JSON.stringify(JSON.parse(error?.toString?.() ?? ""), null, 4);
  } catch {
    return error?.toString?.() ?? "Unknown error";
  }
}
