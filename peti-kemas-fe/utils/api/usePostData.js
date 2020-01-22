import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";

const URL = 'http://localhost:3001/'
// process.env.NODE_ENV === "production"
//   ? process.env.URL_PROD
//   : process.env.URL_DEV;

// ===== USE REDUCER ==========
function fetchReducer(state, action) {
  // console.log(state);
  console.log(action);
  const { type, result } = action;

  switch (type) {
    case "FETCH_INIT":
      return {
        code: "",
        title: "",
        message: "",
        isLoading: true
      };

    case "POST_SUCCESS":
      return {
        ...state,
        code: result.code,
        title: result.title,
        message: result.message,
        data: result.data,
        isLoading: false,
        isError: false
      };

    case "FETCH_FAILURE":
      return {
        ...state,
        code: result.code,
        title: result.title,
        message: result.message,
        data: result.data,
        isLoading: false,
        isError: true
      };

    case "NETWORK_FAILURE":
      console.log("NETWORK_FAILURE");
      return {
        ...state,
        code: 500,
        title: "Network Error",
        message:
          "Sepertinya ada masalah dengan koneksi jaringan Anda, harap hubungi technical support",
        isLoading: false,
        isError: true
      };

    default:
      throw new Error();
  }
}

function configReducer(state, action) {
  const { api, params, config, fieldName } = action;

  switch (config) {
    case "init":
      return {
        API: "",
        params: {},
        HEADERS: { "Content-Type": "application/json" }
      };

    case "file":
      const formData = new FormData();
      formData.append(fieldName, params);
      return {
        API: api,
        PARAMS: formData,
        HEADERS: {
          // 'Content-Type': `multipart/form-data`,
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
        }
      };

    default:
      return {
        API: api,
        PARAMS: params,
        HEADERS: { "Content-Type": "application/json" }
      };
  }
}

export default function usePostData(initialAPI, initialParams) {
  const [state, dispatch] = useReducer(fetchReducer, {
    code: null,
    title: "",
    message: "",
    isLoading: true
  });

  const [config, dispatchConfig] = useReducer(configReducer, {
    API: initialAPI,
    PARAMS: initialParams,
    HEADERS: { "Content-Type": "application/json" }
  });

  useEffect(() => {
    let didCancel = false;

    async function postData() {
      dispatch({ type: "FETCH_INIT" });
      let result = null;

      const options = {
        method: "post",
        headers: config.HEADERS,
        url: URL + config.API,
        data: config.PARAMS
        // xsrfCookieName: 'XSRF-TOKEN',
        // xsrfHeaderName: 'X-XSRF-TOKEN',
      };

      try {
        result = await axios(options);
        console.log("Result: ", result);

        if (!didCancel) {
          dispatch({
            type: "POST_SUCCESS",
            result: result.data
          });
          dispatchConfig({ config: "init" });
        }
      } catch (error) {
        if (error) {
          if (state.code === null) {
            dispatch({ type: "NETWORK_FAILURE" });
          } else {
            console.log(state);
            result = error.response.data;
            dispatch({ type: "FETCH_FAILURE", result });
          }
          // console.log('Result error di luar: ', error, typeof error);
          // if (error.response.data.code) {
          //   console.log('Result error di luar: ', error.response.data);
          // } else {
          // }
        }

        state.code = null;
      }
    }

    console.log(config);
    if (config.API !== "") {
      postData();
    }

    return () => {
      didCancel = true;
    };
  }, [config]);

  function postData(api, params, configType, fieldName) {
    console.log(
      "URL: ",
      URL + api,
      " PARAMS: ",
      params,
      " CT: ",
      configType,
      " FieldName: ",
      fieldName
    );
    if (configType) {
      dispatchConfig({ api, params, config: configType, fieldName });
    } else {
      dispatchConfig({ api, params });
    }
  }

  return [state, postData];
}
