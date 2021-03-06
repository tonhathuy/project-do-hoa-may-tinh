import React, { useContext } from "react"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDatGui from "./ReactDatGui";

import Three_test_2 from "./three_test_2";


const Body_ = (props) => {
    
    
    return (
    <>
    
    <div id="webgl" style={{position: "absolute", width: "100%", height: "100%"}}>
    <Three_test_2 data={props.data} geometry={props.geometry} surface={props.surface} light={props.light} animation={props.animation}/>
    <ReactDatGui initialDatState={props.data} geometry={props.geometry} handleUpdate={props.handleUpdate}/>
    </div>
    </>
    )
}


class Navbar_ extends React.Component{
    constructor(props){
        super(props);
        const initialDatState = {
            string: "Camera",
            far: 1000,
            fov: 75,
            near: 1,
            colorObject: "#2FA1D6",
            colorLight: "0xffffff",
            lightPosition: 2,
            objectTransform: "translate"
        };
        this.state = { 
            geometry: "box",
            surface: "default",
            light: "remove",
            animation: "none",
            data: initialDatState,
        };
        
        this.ref = React.createRef();

    }

    handleUpdate = newData =>
    this.setState(prevState => ({
        data: { ...prevState.data, ...newData }
    }));
    render(){
        return (
            <>
            <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
            <Navbar.Brand href="#home" className="pl-5">Web Demo Three.js</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto" style={{width: "40%"}}>
                    
                    <NavDropdown title="Geometry" id="collasible-nav-dropdown" className="ml-4">
                        <p>Value {this.state.geometry}</p>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"box"})}}>box</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"sphere"})}}>sphere</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"cone"})}}>cone</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"cylinder"})}}>cylinder</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"torus"})}}>torus</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"torusknot"})}}>torusknot</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"tube"})}}>tube</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"teapot"})}}>teapot</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"tetrahedron"})}}>tetrahedron</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"octahedron"})}}>octahedron</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"dodecahedron"})}}>dodecahedron</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"icosahedron"})}}>icosahedron</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Surface" id="collasible-nav-dropdown" className="ml-4">
                        <p>Value {this.state.surface}</p>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"point"})}}>point</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"line"})}}>line</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"phong"})}}>phong</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"lambert"})}}>lambert</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"standard"})}}>standard</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"checkerboard"})}}>checkerboard</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"texture1"})}}>texture1</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"fingerprint"})}}>fingerprint</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"purplemap"})}}>purplemap</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"particle"})}}>particle</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"scratch"})}}>scratch</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"uit"})}}>uit</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"default"})}}>default</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Light" id="collasible-nav-dropdown" className="ml-4">
                        <p>Value {this.state.light}</p>
                        <NavDropdown.Item onClick={() => {this.setState({light:"point"})}}>point</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({light:"ambient"})}}>ambient</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({light:"spot"})}}>spot</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({light:"directional"})}}>directional</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({light:"remove"})}}>remove</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Animation" id="collasible-nav-dropdown" className="ml-4">
                        <p>Value {this.state.animation}</p>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"animation1"})}}>animation 1</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"animation2"})}}>animation 2</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"animation3"})}}>animation 3</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"animation4"})}}>animation 4</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"remove"})}}>remove</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
            </Navbar.Collapse>
            </Navbar>
            <Body_ geometry={this.state.geometry} surface={this.state.surface} light={this.state.light} animation={this.state.animation} data={this.state.data} handleUpdate={this.handleUpdate}/>
            </>
        );
    }
}


export default Navbar_