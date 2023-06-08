import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};

// Example --------------------------------------------------on how to use this withRouter Component 
// import { withRouter } from "./with-router";
// function MyComponent(props){

//     // access router's props
//     const { location, navigate, params } = props.router;
//     console.log("Current Location: ", location);
//     console.log("URL parameters: ", params);

//     // example of navigation
//     const handleClick = () => {
//         navigate("/other-page");
//     };

//     return (
//         <div>
//             <h1>MyComponent</h1>
//             <button onClick={handleClick}>Go to other page</button>
//         </div>

//     );

// }

// const MyComponentWithRouter = withRouter(MyComponent);
// export default MyComponentWithRouter;
