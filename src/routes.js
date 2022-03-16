import {CHAT_ROUTE, LOGIN_ROUTE} from "./utils/const";
import Login from "./components/Login";
import Chat from "./components/Chat";

export const publicRoutes = [
    {path: LOGIN_ROUTE, Element: Login},
    {path: "*",Element:Login,  toPath: LOGIN_ROUTE  }
]
export const privateRoutes = [

    {path: CHAT_ROUTE, Element: Chat},
    {path: "*",Element: Chat,  toPath: CHAT_ROUTE}

]