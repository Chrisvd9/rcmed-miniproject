export { Page };

import { usePageContext } from "../../renderer/usePageContext";

function Page() {
  const pageContext = usePageContext();
  let { abortReason } = pageContext;
  if (!abortReason) {
    abortReason = pageContext.is404
      ? "Page not found."
      : "Something went wrong.";
  }
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-500">{abortReason}</h1>
    </div>
  );
}
