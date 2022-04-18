import React,{Component} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// import vertex from "./shaders/vertexShader";
// import fragment from "./shaders/fragmentShader";
// import * as dat from 'dat.gui';

/**
 * This is the main rendering component. This component consist of:
 * 1] The basic scene
 * 2] Camera
 * 3] Orbit Controls
 */

//Initialise GUI
// const gui = new dat.GUI();


class ThreeScene extends Component{
    
    //This is a function to handle resizing of window
    handleWindowResize = ()=>{
        // console.log("hello")
        
        //update the camera
        this.camera.aspect = window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix()
        // console.log(this.camera.aspect)

        //update the renderer
        this.renderer.setSize(window.innerWidth,window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.render(this.scene,this.camera)
        // this.canvas = this.renderer.domElement

    }

    // This is a function to display in fullscreen
    handleFullscreen = () => {
    
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    
        if(!fullscreenElement)
        {
            if(this.canvas.requestFullscreen)
            {
                try{this.canvas.requestFullscreen()}
               catch(err){
                   console.log(err)
               }
            }
            else if(this.canvas.webkitRequestFullscreen)
            {
                this.canvas.webkitRequestFullscreen()
            }
        }
        else
        {
            if(document.exitFullscreen)
            {
                document.exitFullscreen()
            }
            else if(document.webkitExitFullscreen)
            {
                document.webkitExitFullscreen()
            }
        }
    }

    animation = ()=>{
        
        // Update controls
        this.controls.update()

        // Render
        this.renderer.render(this.scene, this.camera)

        requestAnimationFrame(this.animation)
    }

    //Load the entire scene
    componentDidMount=()=>{

        this.size = {
            width:window.innerWidth,
            height:window.innerHeight
        }
       
        //scene
        this.scene = new THREE.Scene()

        //renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias:true
        })
        this.renderer.setSize(this.size.width,this.size.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.toneMapping = THREE.NoToneMapping;

        // Assign the canvas
        this.canvas = this.renderer.domElement
        
        //camera
        this.camera = new THREE.PerspectiveCamera(45,this.size.width/this.size.height,0.1,100)
        this.camera.position.set( - 15, 7, 15 )
        this.camera.lookAt(this.scene.position)
        this.scene.add(this.camera)

        // Controls
        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enableDamping = true

        //Add cube
        var geometry = new THREE.PlaneGeometry(1,1)
        var material = new THREE.MeshBasicMaterial(
            {
                color:new THREE.Color('red'),
                
            }
        )
        this.cube = new THREE.Mesh(geometry,material)
        this.scene.add(this.cube)

        
        //Add Ambient light
        const light = new THREE.AmbientLight(0xcccccc,0.4)
        this.scene.add(light)

        // Add directional Light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
		directionalLight.position.set( - 1, 1, 1 );
        this.scene.add( directionalLight );    

        this.renderer.render(this.scene,this.camera)

        //Add event listener for resizing
        window.addEventListener('resize',this.handleWindowResize,false)

        // Add event listener for Fullscreen
        window.addEventListener('dblclick', this.handleFullscreen)


        this.mount.appendChild(this.renderer.domElement)

        this.animation()

    }
    
    render(){
        return(
            <div ref={
                mount=>{this.mount = mount}
            }>
            </div>
        )
    }

}

export default ThreeScene;