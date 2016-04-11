/********************************************************************************
	MAIN SCRIPT
	copyright© 2014 Marco Stagni. http://marcostagni.com
********************************************************************************/

include("app/scripts/cube/mybox")

Class("MyGame", {

	MyGame: function() {
		App.call(this);

	},

	onCreate: function() {

		// ricezione del messaggio dal router
		console.log(parent);
		function eventListener(event) {
			console.log("inside scene");
			console.log(event);
			event.source.postMessage("Hi, router!", event.origin);
		}
		window.addEventListener("message", eventListener, false);
		parent.postMessage("Hi router from child", "http://localhost:8080")

		include("app/SceneLoader", function() {
			app.sceneLoader = new THREE.SceneLoader();
			var oReq = new XMLHttpRequest();
		    oReq.addEventListener("load", function() {
				console.log(this);
				app.loadData(this.responseText);
			});
		    oReq.open("GET", "scene.json");
		    oReq.send();
		});

		//var geometry = new THREE.CubeGeometry(20, 20, 20);
		//var material = new THREE.MeshBasicMaterial({
		//	color: 0xff0000,
		//	wireframe : true
		//});

		//var cube = new Mesh(geometry, material, {script : "mybox", dir : "cube"});

		//console.log("Inside onCreate method");

		//document.addEventListener( 'mousemove', app.onDocumentMouseMove, false );
		//document.addEventListener( 'touchstart', app.onDocumentTouchStart, false );
		//document.addEventListener( 'touchmove', app.onDocumentTouchMove, false );
		//document.addEventListener( 'mousewheel', app.onDocumentMouseWheel, false);

		//example for camera movement
		//app.camera.addScript("cameraScript", "camera");
	},

	loadData: function(data) {
		this.sceneLoader.parse(JSON.parse(data), function(e) {
			app.scene = e.scene;
		}, '.')
	}

})._extends("App");
