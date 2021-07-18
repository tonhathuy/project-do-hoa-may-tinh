import React, { Component } from "react";
import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import  TransformControls  from '../source/TransformControls.js'
import { TeapotGeometry } from "../source/TeapotGeometry";
import fileGlb from './bread.glb' // GLB FILE
let flag = false;
const getAmbientLight = (color, intensity) => {
    let light = new THREE.AmbientLight(color, intensity);
    light.castShadow = true;
  
    return light;
  }
const getSpotLight = (color, intensity) => {
    let light = new THREE.SpotLight(color, intensity);
    light.castShadow = true;
  
    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
  
    return light;
  }
  
  const getDirectionalLight = (color, intensity) => {
    let light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;
  
    light.shadow.camera.left = -10
    light.shadow.camera.bottom = -10
    light.shadow.camera.right = 10
    light.shadow.camera.top = 10
  
    return light;
  }
function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: 'rgb(120, 120, 120)',
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);

	return mesh;
}
function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshBasicMaterial({
		color: 'rgb(255, 255, 255)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material 
	);

	return mesh;
}
class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {

		super();

		this.scale = scale;

	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );

	}

}
const path = new CustomSinCurve( 0.8);
class Scene extends Component {
    constructor(props) {
        super(props);
        this.OrbitControls = require('three-orbit-controls')(THREE)
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.state = {position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 3, y: 3, z: 3 } }
    }
    // FUNCTION FOR SAVE VALUES FORM INPUTS
    stateUpdate = (event, direction, axis, ajustFunc) => {
        // CHANGING EVENT TO MOUSE DATA IF...
        const targetValue = typeof event === "number" ? event : event.target.value;
        const isNum = targetValue === "" ? "" : Number(targetValue);
        this.setState(state => {
        return state[direction] = { ...state[direction], [axis]: isNum }
        }, () => ajustFunc(direction, axis));
    };

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.OrbitControls = require('three-orbit-controls')(THREE)
        const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        var camera = new THREE.PerspectiveCamera(
            45,
            width/height,
            1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: this.props.data.colorObject });
        var plane = getPlane(20);
        const cube = new THREE.Mesh(geometry, material);

        const size = 10;
        const divisions = 25;
        // GRID helper
        this.gridHelper = new THREE.GridHelper( size, divisions );
        cube.position.y = cube.geometry.parameters.height/2;
        plane.rotation.x = Math.PI/2;
        const light = new THREE.PointLight( 0xffffff, 1);
        light.position.y = 1;
        camera.position.x = 1;
        camera.position.y = 2;
        camera.position.z = 5;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        
        
        scene.add(cube);
        scene.add(light);
        scene.add(plane);
        scene.add( this.gridHelper );
        renderer.setClearColor('rgb(120, 120, 120)');
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.material = material;
        this.cube = cube;
        
        
        // this.control = new TransformControls( this.camera, this.renderer.domElement );
        // this.control.addEventListener( 'change', () => { this.renderer.render(this.scene, this.camera); });
        // this.control.setSize(1);
        // this.control.setMode( "translate" );
        // this.controls = new this.OrbitControls(this.camera);
        
        // var TransformControls = require('../controls/TransformControls')(THREE);
        this.control = new TransformControls( this.camera, this.renderer.domElement );
        this.control.addEventListener( 'change', () => { this.renderer.render(this.scene, this.camera); });
        this.control.setSize(1);
        
        // this.controls = new this.OrbitControls(this.camera);
        // EVENT LISTNER TO DISABLE ORBIT MOVE
        this.control.addEventListener( 'dragging-changed', ( event ) => {
            // this.updateSetState();
            this.control.setMode( "translate" );
            this.orbit.enabled = ! event.value});
        
        // ORBIT CONTROL
        this.orbit = new this.OrbitControls( this.camera, this.renderer.domElement );
        this.camera.position.set( 0, 2, 2 );
        this.orbit.update();
    
        //EVENT LISTNER TO VIEW MODEL IN DIFFERENT POSITIONS
        this.orbit.addEventListener("change", () => this.renderer.render(this.scene, this.camera));
            
        // ATTACH MODEL TO TRANSFORM CONTROL
        this.control.attach(this.cube);
        this.scene.add( this.control );
        this.orbit.update();


        this.mount.appendChild(this.renderer.domElement);
        // this.start();
    }
      // UPDATE REACT STATE AND INPUT VALUE
    updateSetState = () => {
        if (this.gltf !== undefined) {
        this.setState((state) => {
            const gltf = this.gltf[this.valType.value]
            return state[this.valType.value] = {x:gltf.x, y:gltf.y, z:gltf.z,}
        });
        };
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log("this.props.geometry:",this.props.geometry);
        // console.log("this.props.surface:",this.props.surface);
        // console.log("this.props.light:",this.props.light);
        console.log("this.props.initialDatState",this.props.data.string)
        
        this.scene = new THREE.Scene();
        var plane = getPlane(20);
        plane.rotation.x = Math.PI/2;
        this.scene.add(plane);
        var sphere = getSphere(0.05);
        var size = 0.5
		var segmentMultiplier = 1;
        var geometry
        var material
        var light 
        switch (this.props.geometry) {
			case 'box':
				geometry = new THREE.BoxGeometry(size, size, size);
				break;
			case 'sphere':
				geometry = new THREE.SphereGeometry(size, 32*segmentMultiplier, 32*segmentMultiplier);
				break;
			case 'cone':
				geometry = new THREE.ConeGeometry(size, size, 256*segmentMultiplier);
				break;
            case 'cylinder':
                console.log("this.props.geometry:",this.props.geometry); 
                geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
                break;
            case 'torus':
                console.log("this.props.geometry:",this.props.geometry); 
                geometry = new THREE.TorusGeometry( 0.5, 0.1, 16, 100 );
                break;     
            case 'torusknot':
                console.log("this.props.geometry:",this.props.geometry); 
                geometry = new THREE.TorusKnotGeometry( 0.5, 0.1, 100, 16 );
                break;
            case 'tube':
                console.log("this.props.geometry:",this.props.geometry); 
                geometry = new THREE.TubeGeometry( path, 100, 0.1, 20, false );
                break;
            case 'teapot':
                console.log("this.props.geometry:",this.props.geometry); 
                geometry = new TeapotGeometry(0.5, 0.5, true, true, true, false, true);
                break;
            case 'tetrahedron':
                console.log("this.props.geometry:",this.props.geometry); 
                geometry = new THREE.TetrahedronGeometry(0.5, 0)
                break;
            case 'octahedron':
                console.log("this.props.geometry:",this.props.geometry); 
                geometry = new THREE.OctahedronGeometry(0.5, 0)
                break;
            case 'dodecahedron':
                console.log("this.props.geometry:",this.props.geometry); 
                geometry = new THREE.DodecahedronBufferGeometry(0.5, 0)
                break; 
            case 'icosahedron':
                console.log("this.props.geometry:",this.props.geometry); 
                geometry = new THREE.IcosahedronGeometry(0.5, 0)
                break;                                  
			default:
				break;
		}
        switch (this.props.surface) {
			case 'point':
                material = new THREE.PointsMaterial({
                    color: 0x00afaf,
                    size: 0.05
                });
				break;
			case 'line':
				material = new THREE.MeshNormalMaterial({
                    color: this.props.data.colorObject,
                    transparent: true,
                    opacity: 1,
                    wireframe: true,
                    wireframeLinewidth: 2,
                    wireframeLinejoin: 'round',
                    wireframeLinecap: 'round',
                });
				break;
			case 'phong':
				material = new THREE.MeshPhongMaterial({
                    color: this.props.data.colorObject
                });
				break;
            case 'lambert':
                material = new THREE.MeshLambertMaterial({
                color: this.props.data.colorObject
                });
                break;
            case 'standard':
                material = new THREE.MeshStandardMaterial({
                color: this.props.data.colorObject
                });
                break;             
			default:
                material = new THREE.MeshBasicMaterial({ color: this.props.data.colorObject });
				break;
		}
        switch (this.props.light) {
			case 'point':
				light = new THREE.PointLight( 0xffffff, 0.1);
                // light.position.set( 50, 50, 50 );
                light.position.y = this.props.data.lightPosition;
                light.add(sphere);
				break;
			case 'ambient':
				light = getAmbientLight(0x404040, 1);
				break;
            case 'spot':
                light = getSpotLight(0x404040, 1);
                light.position.set(5, 5, 5);
				break;
            case 'directional':
                light = getDirectionalLight(0x404040, 1);
                light.position.set(5, 5, 5);
                break;          
			case 'remove':
				// geometry = this.props.geometry;
				break;
			default:
				break;
		}

        if (this.props.surface == 'point'){
            this.cube = new THREE.Points(geometry, material );
            
        }else{ this.cube = new THREE.Mesh(geometry, material );}
        // console.log(this.cube.geometry.parameters.height/2);
        this.cube.position.y = 1;
        // this.cube = new THREE.Points(geometry, material );
        
        // camera.position.z = 4;
        this.camera.fov = this.props.data.fov
        this.camera.near = this.props.data.near
        this.camera.far = this.props.data.far
        this.camera.updateProjectionMatrix();
        this.scene.add(this.cube);
        this.scene.add( light );
        this.scene.add( this.gridHelper );
        
        this.control.addEventListener( 'change', () => { this.renderer.render(this.scene, this.camera); });
        this.control.setSize(1);
        
        // this.controls = new this.OrbitControls(this.camera);
        // EVENT LISTNER TO DISABLE ORBIT MOVE
        this.control.addEventListener( 'dragging-changed', ( event ) => {
            // this.updateSetState();
            this.control.setMode(this.props.data.objectTransform);
            
            this.orbit.enabled = ! event.value});
        
        // ORBIT CONTROL
        // this.orbit = new this.OrbitControls( this.camera, this.renderer.domElement );
        this.camera.position.set( 0, 2, 2 );
        this.orbit.update();
    
        //EVENT LISTNER TO VIEW MODEL IN DIFFERENT POSITIONS
        this.orbit.addEventListener("change", () => this.renderer.render(this.scene, this.camera));
            
        // ATTACH MODEL TO TRANSFORM CONTROL
        this.control.attach(this.cube);
        this.scene.add( this.control );
        this.orbit.update();

        
        this.renderer.render(this.scene, this.camera);
        // console.log(this.props.animation );
        if (this.props.animation === 'remove'){
            this.stop();
            console.log(this.props.animation );
        }
        else{
            this.start();
        }
        
    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }
    

    start() {
        console.log('okie');
        this.frameId = requestAnimationFrame(this.animate);
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    animate() {
        switch (this.props.animation) {
			case 'animation1':
				this.cube.rotation.x += 0.01;
				break;
			case 'animation2':
				this.cube.rotation.y += 0.01;
				break;
			case 'animation3':
				this.cube.rotation.z += 0.01;
				break;
            case 'animation4':
                if (this.cube.position.y < 3 && flag === false) {
                    this.cube.position.y += 0.03;
                  } else if (this.cube.position.y >= 3) {
                    flag = true;
                  }
                
                  if (this.cube.position.y > 1 && flag === true) {
                    this.cube.position.y -= 0.03;
                  } else if (this.cube.position.y <= 1) {
                    flag = false;
                  }
                
                  this.cube.rotation.x += 0.005;
                  this.cube.rotation.y += 0.005;
                  this.cube.rotation.z += 0.005;
                break;        
			default:
				break;
		}
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
        // this.controls.update();
    }

    render() {
        return (
        <div
            style={{ width: "100%", height: "100%" }}
            ref={(mount) => {
            this.mount = mount;
            }}
        />
        );
    }
}

export default Scene;

