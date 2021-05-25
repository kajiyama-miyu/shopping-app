import React from "react";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  getLoadingState,
  getLoadingText,
} from "../../reducks/loading/selectors";
import { RootState } from "../../reducks/store/rootReducer";

const Loading: React.FC = ({ children }) => {
  const selector = useSelector((state: RootState) => state);
  const isBeingLoaded = getLoadingState(selector);
  const loadingText = getLoadingText(selector);

  return (
    <div>
      {isBeingLoaded && (
        <section className="c-section__loading">
          <CircularProgress />
          <p>{loadingText}</p>
        </section>
      )}
      {children}
    </div>
  );
};

export default Loading;
