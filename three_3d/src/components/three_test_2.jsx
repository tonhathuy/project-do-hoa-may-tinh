import React, { Component } from "react";
import * as THREE from "three";

class Scene extends Component {
    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
    }

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
        const cube = new THREE.Mesh(geometry, material);
        const light = new THREE.PointLight( 0xffffff, 1);
        light.position.y = 1;
        camera.position.z = 4;
        scene.add(cube);
        scene.add(light);
        renderer.setClearColor("#000000");
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.material = material;
        this.cube = cube;
        
        this.mount.appendChild(this.renderer.domElement);
        this.start();
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("this.props.geometry:",this.props.geometry);
        console.log("this.props.surface:",this.props.surface);
        console.log("this.props.light:",this.props.light);
        this.scene = new THREE.Scene();
        var size = 1
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
                console.log("this.props.children:",this.props.children); 
                geometry = new THREE.CylinderGeometry(5, 5, 20, 32);
                break;
			default:
				break;
		}
        switch (this.props.surface) {
			case 'point':
				material = new THREE.PointsMaterial({ size: 0.05, transparent: true });
				break;
			case 'line':
				material = new THREE.MeshNormalMaterial({
                    color: 0xff0000,
                    transparent: true,
                    opacity: 1,
                    wireframe: true,
                    wireframeLinewidth: 5,
                    wireframeLinejoin: 'round',
                    wireframeLinecap: 'round',
                });
				break;
			case 'solid':
				material = new THREE.MeshPhongMaterial({
                    color: 'rgb(0, 0, 0)'
                });
				break;
			default:
				break;
		}
        switch (this.props.light) {
			case 'point':
				light = new THREE.PointLight( 0xffffff, 30);
                // light.position.set( 50, 50, 50 );
                light.position.y = 3;
                
				break;
			case 'ambient':
				light = new THREE.AmbientLight( 0x404040 );;
				break;
			case 'remove':
				geometry = new THREE.ConeGeometry(size, size, 256*segmentMultiplier);
				break;
			default:
				break;
		}
        this.cube = new THREE.Mesh(geometry, material );

        this.scene.add(this.cube);
        this.scene.add( light );
        this.renderer.render(this.scene, this.camera);

        this.start();
    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }
    

    start() {
        if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate);
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    animate() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
        <div
            style={{ width: "800px", height: "600px" }}
            ref={(mount) => {
            this.mount = mount;
            }}
        />
        );
    }
}

export default Scene;
