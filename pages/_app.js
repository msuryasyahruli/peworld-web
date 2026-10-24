import { Provider } from "react-redux";
import "../public/styles/globals.css";
import { store } from "../config/redux/store";
import { AuthProvider } from "../config/AuthContext";
// import exp from "../config/redux/Exp";

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
