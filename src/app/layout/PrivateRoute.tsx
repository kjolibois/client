import { ComponentType } from "react";
import { Redirect, RouteComponentProps, RouteProps } from "react-router";
import { Route } from "react-router-dom";
import { useAppSelector } from "../../store/configureStore";
interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
}
export default function PrivateRoute ({ component: Component , ...rest}: Props){
    const {user} = useAppSelector(state => state.account);
    return(
        <Route
        {...rest}
        render= {(props :any) => 
         user ? ( 
         <Component {...props}/> 
            ) : (
            <Redirect 
                to={{
                    pathname:"/login",
                    state:{from : props.location}
                }}
            />
        )
    }
    />
    );
}


