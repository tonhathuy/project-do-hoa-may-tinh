import * as THREE from './source/three.module.js';
import {OrbitControls} from './source/OrbitControls.js';

function init(option) {
	var scene = new THREE.Scene();
	var object, objectMaterial;
	objectMaterial = getMaterial("rgb(255,255,255)");
	object = getObject(option, 2, objectMaterial, scene);
	var planeMaterial = getMaterial('rgb(120, 120, 120)');
	var plane = getPlane(planeMaterial, 300);
	plane.rotation.x = Math.PI/2;
	scene.add(object);
	scene.add(plane);

	var camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,1000);
	camera.position.x = 5;
	camera.position.y = 10;
	camera.position.z = 10;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120, 120, 120)');
	renderer.shadowMap.enabled = true;
	document.getElementById('webgl').appendChild(renderer.domElement);
	var controls = new OrbitControls( camera, renderer.domElement );
	update(renderer, scene, camera, controls);
	return scene;
}

function getObject(type, size, material) {
	var object;
	var segmentMultiplier = 1;
	switch (type) {
		case 'box':
			object = new THREE.BoxGeometry(size, size, size);
			break;
		case 'sphere':
			object = new THREE.SphereGeometry(size, 32*segmentMultiplier, 32*segmentMultiplier);
			break;
		case 'cone':
			object = new THREE.ConeGeometry(size, size, 256*segmentMultiplier);
			break;
		default:
			break;
	}
	var obj = new THREE.Mesh(object, material);
	obj.castShadow = true;
	obj.name = type;
	obj.position.set(0,size,0);
	return obj;
}

function getMaterial(color) {
	var selectedMaterial;
	var materialOptions = {
		color: color === undefined ? 'rgb(255, 255, 255)' : color,
	};
	selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
	return selectedMaterial;
}

function getPlane(material, size) {
	var object = new THREE.PlaneGeometry(size, size);
	material.side = THREE.DoubleSide;
	var obj = new THREE.Mesh(object, material);
	obj.receiveShadow = true;
	return obj;
}

function update(renderer, scene, camera, controls) {
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(function() {
		update(renderer, scene, camera, controls);
	});
}

export default init;