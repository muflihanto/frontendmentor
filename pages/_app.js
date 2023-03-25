import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { Provider } from "jotai";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
