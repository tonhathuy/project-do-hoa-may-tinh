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
    <ReactDatGui initialDatState={props.data} geometry={props.geometry} handleUpdate={props.handleUpdate}/>
    <div id="webgl" style={{position: "absolute"}}>
    <Three_test_2 data={props.data} geometry={props.geometry} surface={props.surface} light={props.light} animation={props.animation}/>
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
            lightPosition: 2,
            objectTransform: "translate"
        };
        this.state = { 
            geometry: "box",
            surface: "default",
            light: "none",
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
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Web Demo Three.js</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    
                    <NavDropdown title="Geometry" id="collasible-nav-dropdown">
                        <p>Value {this.state.geometry}</p>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"box"})}}>box</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"sphere"})}}>sphere</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"cone"})}}>cone</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"cylinder"})}}>cylinder</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"torus"})}}>torus</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"torusknot"})}}>torusknot</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Surface" id="collasible-nav-dropdown">
                        <p>Value {this.state.surface}</p>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"point"})}}>point</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"line"})}}>line</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"solid"})}}>solid</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"default"})}}>default</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Light" id="collasible-nav-dropdown">
                        <p>Value {this.state.light}</p>
                        <NavDropdown.Item onClick={() => {this.setState({light:"point"})}}>point</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({light:"ambient"})}}>ambient</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({light:"remove"})}}>remove</NavDropdown.Item>
                    </NavDropdown>  
                    <NavDropdown title="Animation" id="collasible-nav-dropdown">
                        <p>Value {this.state.animation}</p>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"box"})}}>box</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"box"})}}>sphere</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"box"})}}>cone</NavDropdown.Item>
                    </NavDropdown>
                    <p>{this.state.data.string}</p>
                </Nav>
                
            </Navbar.Collapse>
            </Navbar>
            <Body_ geometry={this.state.geometry} surface={this.state.surface} light={this.state.light} animation={this.state.animation} data={this.state.data} handleUpdate={this.handleUpdate}/>
            </>
        );
    }
}


export default Navbar_