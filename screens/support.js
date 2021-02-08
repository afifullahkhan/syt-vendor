// @refresh reset
import firestore from '@react-native-firebase/firestore';
import FBStorage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database'; 
import React, { useState, useEffect, useCallback } from 'react'
import {View} from 'react-native'
import auth from '@react-native-firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat'
import {getCurrentUserDetails} from '../firebase/helpers';
import {useDispatch,useSelector} from 'react-redux';
import {Avatar, Header} from 'react-native-elements';

const db = firestore()
const chatsRef = db.collection('chats')
export default class Support extends React.Component {
        state={
            user:{uid:auth().currentUser.uid},
            name:"",
            messages:[]
        }
        componentDidMount(){
            var t =getCurrentUserDetails().then((res)=>{
                this.setState({name:res.fullname});
                this.readUser();

            });
        }

        readUser=async ()=> {
            //alert(this.state.user.uid);
              const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
                const messagesFirestore = querySnapshot
                    .docChanges()
                    .filter(({doc})=>(doc.data().To==this.state.user.uid||doc.data().user._id==this.state.user.uid))
                    .filter(({ type }) => type === 'added')
                    .map(({ doc }) => {
                        const message = doc.data()
                        return { ...message, createdAt: message.createdAt.toDate()}
                    })
                    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                this.appendMessages(messagesFirestore)
            })
            return () => unsubscribe()
        }
    
        handleSend=async(messages)=> {
           var  msg={...messages[0],To:"Admin"};
           console.log(msg);
            const writes = messages.map((m) => chatsRef.add({...m,To:"admin"}))
            await Promise.all(writes)
        }
        appendMessages = 
            (messages) => {
                this.setState({messages:GiftedChat.append(this.state.messages, messages)},()=>{
                    return this.state.messages;
                })
            }
            
        
        render(){
    
    return <GiftedChat messages={this.state.messages}  user={{_id:this.state.user.uid,name:this.state.name}} onSend={this.handleSend} />
        }

}