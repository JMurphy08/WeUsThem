<template>
  <div>
    <v-row>
    <SideMenu v-on:changePage="updatePage($event)"/>
    <Inbox v-on:archiveMessage="archiveMessage($event)" v-on:postMessage="postMessage($event)" v-on:deleteMessage="deleteMessage($event)" v-if="currentPage == 'inbox'" v-bind:mail="messages.inbox"/>
    <Sent v-on:deleteMessage="deleteMessage($event)" v-if="currentPage == 'sent'" v-bind:mail="messages.sent"/>
    <Spam v-on:deleteMessage="deleteMessage($event)" v-if="currentPage == 'spam'" v-bind:mail="messages.spam"/>
    <Archived v-on:deleteMessage="deleteMessage($event)" v-if="currentPage == 'archived'" v-bind:mail="messages.archived"/>
    </v-row>
  </div>
</template>

<script>
import SideMenu from "../components/SideMenu";
import Inbox from "../components/Inbox";
import Archived from "../components/Archived";
import Sent from "../components/Sent";
import Spam from "../components/Spam";

import axios from 'axios';
import io from "socket.io-client"

export default {
  components: {
    SideMenu,
    Inbox,
    Sent,
    Archived,
    Spam
  },
  data(){
    return {
      currentPage: 'inbox',
      messages: {},
      socket: {}
    }
  },
  created(){
    // axios.get('http://localhost:5000/messages').then(res => this.messages = res.data)
    // .catch(err => alert(err));
    this.socket = io.connect('http://localhost:5000/');
  },
  mounted(){
    this.socket.on('mail', (data) => {
        this.messages = data;
    });
    console.log(this.messages);
  },
  methods: {
    updatePage(where){
      this.currentPage = where;
    },
    postMessage(obj){
      this.socket.emit('postMessage', obj)
    },
    deleteMessage(obj){
      this.socket.emit('deleteMessage', obj);
    },
    archiveMessage(obj){
      this.socket.emit('archiveMessage', obj);
    }
  }
};
</script>
