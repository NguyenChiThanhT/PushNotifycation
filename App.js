
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Picker,AppState,TouchableOpacity} from 'react-native';
import PushController from './controller/PushController';
import PushNotification from 'react-native-push-notification';
export default class App extends Component<Props> {
    constructor(props){
        super(props);
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.getPush = this.getPush.bind(this);
        this.state = {
            seconds: 5,
        };
    }
    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }
    handleAppStateChange(appState) {
        if (appState === 'background') {
            // let date = new Date(Date.now() + (this.state.seconds * 1000));
            //
            // if (Platform.OS === 'ios') {
            //     date = date.toISOString();
            // }

            PushNotification.localNotificationSchedule({
                message: "My Notification Message",
                date: new Date(Date.now() + (this.state.seconds * 1000))
            });
        }
    }
    getPush(){
        //alert("agag")
        PushNotification.localNotification({
            message: "My Notification Message",
        });
    }
    render() {
    return (
         <View style={{flex:1,justifyContent: "center",alignItems:"center"}}>
             <TouchableOpacity onPress={this.getPush}>
                 <Text>Get</Text>
             </TouchableOpacity>
         <Text>Nguyen Chi thanh</Text>
             <Picker
                 style={{width:100}}
                 selectedValue={this.state.seconds}
                 onValueChange={(seconds) => this.setState({ seconds })}
             >
                 <Picker.Item label="5" value={5} />
                 <Picker.Item label="10" value={10} />
                 <Picker.Item label="15" value={15} />
             </Picker>
             <PushController />
         </View>
    );
  }
}
