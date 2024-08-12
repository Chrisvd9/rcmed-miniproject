export { Layout };

import React from "react";
import PropTypes from "prop-types";
import { childrenPropType } from "./PropTypeValues";
import './Layout.css'
import { PageContextProvider } from "./usePageContext";

Layout.propTypes = {
  pageContext: PropTypes.any,
  children: childrenPropType,
};
function Layout({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <main>{children}</main>
      </PageContextProvider>
    </React.StrictMode>
  );
}