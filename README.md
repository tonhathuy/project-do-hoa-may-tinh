# CS105.L22.KHCL final project
## _✨ThreeJS Website✨_
| Member | ID |
| ------ | ------ |
| Hoang Van Hung | 18520794 |
| To Nhat Huy| 18520855 |
### Option 1: Docker
##### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) 3.5.2
##### Develop Setup
1. Build Docker image
```
docker build -t threejs_demo:v1 
```
2. Run image 
```
docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 8001:3000 -e CHOKIDAR_USEPOLLING=true threejs_demo:v1
```
3. Open website
- [Localhost port 8001](http://localhost:8001/)
### Option 2: NodeJS
##### Prerequisites
- [node.js](https://nodejs.org/en/) - evented I/O for the backend
- npm 7.6.0
##### Develop Setup
1. install lib:
```
npm install
```
or
```
npm i
```
2. Start Sever:

```
npm start
```
### Resource
1. Demo:
[Demo](https://bom.to/demothreejs )
3. Reference:
[ThreeJS Website](https://threejs.org/)