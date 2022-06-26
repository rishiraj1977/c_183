import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import * as FaceDetector from 'expo-face-detector';
import Filter1 from './Filter';
import Filter2 from './Filter2';
import Filter3 from './Filter3';
import { TouchableOpacity } from 'react-native-web';

var data =[
    {'id':'1','image':require('../assets/glasses.png')},
    {'id':'2','image':require('../assets/glasses.png')},
    {'id':'3','image':require('../assets/glasses.png')}
] 

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: [],
            currentFilter:'filter_1'
        }

    }

    componentDidMount() {
        Permissions
            .askAsync(Permissions.CAMERA)
            .then(this.onCameraPermission)
    }

    onCameraPermission = (status) => {
        this.setState({ hasCameraPermission: status.status === 'granted' })
    }

    onFacesDetected = (faces) => {
        this.setState({ faces: faces })
    }

    onFaceDetectionError = (error) => {
        console.log(error)
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        console.log(this.state.faces)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}> 
                        <Text style={[styles.titleText,{color:'white'}]}>FR</Text>
                        <Text  style={[styles.titleText,{color:'blue'}]}>APP</Text>
                    </View>

                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}> 
                        <Text style={[styles.titleText,{fontSize:20,color:'white'}]}>Try out</Text>
                        <Text style={[styles.titleText,{fontSize:20,color:'blue'}]}>amazing filters!</Text>
                    </View>
                   
                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                    {
                        this.state.faces.map((face)=>{
                            if (this.state.currentFilter==='filter_1'){
                                return (
                                    <Filter1 key={face.faceID} face={face}></Filter1>
                                )
                            }else if (this.state.currentFilter==='filter_2'){
                                return (
                                    <Filter2 key={face.faceID} face={face}></Filter2>
                                )
                            }else if (this.state.currentFilter==='filter_3'){
                                return (
                                    <Filter3 key={face.faceID} face={face}></Filter3>
                                )
                            }
                            
                        })
                    }
                </View>
                <View style={styles.filterContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} 
                        style={{flexDirection: 'row'}}>
                    {
                        data.map((item)=>{
                            retun(
                                <TouchableOpacity onPress={()=>{
                                    this.setState({currentFilter:`filter_${item.id}`})
                                }} style={{
                                    backgroundColor:'grey',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    borderRadius:30,
                                    marginRight:20,
                                    height:10,
                                    width:15}}>

                                    <Image source={item.image} style={{height:30,width:80}} />
                                </TouchableOpacity>
                            )
                        })
                    }
                    </ScrollView>
                </View>
                <View style={styles.actionContainer}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'yellow'
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textShadowColor: 'black',
        textShadowOffset: {width:-3,height:3}
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {
        flex:0.2,
        backgroundColor:'yellow',
        padding:20
    },
    actionContainer: {}
});