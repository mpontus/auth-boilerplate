import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { logoutAction } from "../action/authActions";
import { User } from "../model/User";
import {
  makeGetCurrentUser,
  makeIsUserAnonymous,
  makeIsUserAuthenticated
} from "../selector/authSelectors";

/**
 * Current user actions and details
 */
interface RenderProps {
  isAuthenticated: boolean;
  isAnonymous: boolean;
  user: User | undefined;
  onLogout: () => void;
}

interface Props extends RenderProps {
  children: (props: RenderProps) => JSX.Element | null;
}

const makeMapStateToProps = createStructuredSelector({
  isAuthenticated: makeIsUserAuthenticated(),
  isAnonymous: makeIsUserAnonymous(),
  user: makeGetCurrentUser()
});

const enhance = connect(
  makeMapStateToProps,
  {
    onLogout: logoutAction.request
  }
);

/**
 * Provides current user details as render props
 */
export const CurrentUserProvider = enhance(
  ({ isAuthenticated, isAnonymous, user, onLogout, children }: Props) =>
    children({ isAuthenticated, isAnonymous, user, onLogout })
);
