import { RouterProvider } from "react-router-dom";
import {router} from "./config"


export const AppRouter = () => {
    return <RouterProvider router={router}/>
}