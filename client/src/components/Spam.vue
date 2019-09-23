<template>
  <div>
    <h1> Spam Messages</h1>
    <v-simple-table class="table">
        <thead>
            <tr>
            
            <th class="text-left">From</th>
            <th class="text-left">Subject</th>
            <th class="text-left">Message</th>
            <th class="text-left">Date</th>
            <th class="text-left">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in mail" :key="item.subject">
            <td><h3>{{ item.from }}</h3></td>
            <td><h4>{{ item.subject }}</h4></td>
            <td>{{ item.message }}</td>
            <td>{{ item.date_pretty }}</td>
            <td><v-icon v-on:click="deleteMessage(index)">mdi-delete</v-icon></td>
            </tr>
        </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'Spam',
  props: {
    mail: []
  },
  data(){
    return{
        items: Array,
    }
  },
  created(){

  },
  methods:{
    deleteMessage(i){
       
        var obj  = {
            ind: i,
            where: 'spam'
        }
         this.$emit('deleteMessage', obj );
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
    width: 1000px
}
</style>
