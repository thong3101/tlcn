import {
    createContext,
    useContext,
    useReducer,
  } from "react";
//   import { AuthContext } from "./AuthContext";
import { useSelector } from "react-redux";
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    // const { currentUser } = useContext(AuthContext);
    const currentUser = useSelector((state) => state.auth.user);

    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatId:
              currentUser.id > action.payload.uid
                ? currentUser.id + action.payload.uid
                : action.payload.uid + currentUser.id,
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };
  