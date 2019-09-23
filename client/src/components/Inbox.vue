<template>
  <div>
    <h1> Inbox</h1>
     <div class="text-center">
        <v-dialog  v-model="dialog">
            <template v-slot:activator="{ on }">
                <v-btn dark v-on="on" color="#2076D2" outlined><v-icon>mdi-plus</v-icon> New</v-btn>
            </template>
            <v-card style="border: 1px solid black">
                <div class="newMail">
                    <h3> New Message</h3>
                     <v-text-field label="To" outlined style="width: 50%; margin-top:1%; margin-left:1%" v-model="to"></v-text-field>
                     <v-text-field label="Subject" outlined style="width: 50%; margin-top:1%; margin-left:1%" v-model="subject"></v-text-field>
                      <v-textarea outlined name="input-7-4" label="Message" style=" margin-top:1%; margin-left:1%; margin-right:1%" v-model="message"></v-textarea>
                       <v-btn small class="send" v-on:click="postMessage"><v-icon>mdi-send</v-icon> Send</v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
    <v-simple-table class="table">
        <thead>
            <tr>
            <th class="text-left">Starred</th>
            <th class="text-left">From</th>
            <th class="text-left">Subject</th>
            <th class="text-left">Message</th>
            <th class="text-left">Date</th>
            <th class="text-left">Archive</th>
            <th class="text-left">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in mail" :key="item.subject">
            <td v-if="item.starred" v-on:click="toggle(false,index)"><v-icon class="star">mdi-star</v-icon></td>
            <td v-if="!item.starred" v-on:click="toggle(true,index)"><v-icon>mdi-star-off</v-icon></td>
            <td><h3>{{ item.from }}</h3></td>
            <td><h4>{{ item.subject }}</h4></td>
            <td>{{ item.message }}</td>
            <td>{{item.date_pretty}}</td>
            <td><v-icon v-on:click="archiveMessage(index)">mdi-archive</v-icon></td>
            <td><v-icon v-on:click="deleteMessage(index)">mdi-delete</v-icon></td>
            </tr>
        </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
      mail: []
  },
  data(){
    return{
        items: Array,
        to: '',
        subject: '',
        message: ''
    }
  },
  created(){
      
  },
  methods:{
    postMessage(){
        var newobj = {
            to: this.to,
            subject: this.subject,
            message: this.message,
            starred: false
        };
        this.$emit('postMessage', newobj);
        this.dialog = false;
    },
    deleteMessage(i){
        if(!this.mail[i].starred){
            var obj  = {
             ind: i,
                where: 'inbox'
            }
         this.$emit('deleteMessage', obj );
        }else{
            alert('You cannot deleted starred mail.');
        }
    },
    archiveMessage(i){
        var obj  = {
            ind: i,
            where: 'inbox'
        }
         this.$emit('archiveMessage', obj );
        
    },
    toggle(val,i){
        this.mail[i].starred = val;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.star{
    color: yellow;
}
.send{
    margin-bottom: 1%;
    color: white;
    background-color: lightgreen;
}
.table{
    width: 100%;
}
</style>
