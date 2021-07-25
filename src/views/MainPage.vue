<template>
  <div class="MainPage">
    Select image:
    <select @change="cangeImage" name="images">
      <option hidden selected></option>
      <option v-for="image in allImages" :key="image.value">
        {{image.name}}
      </option>
    </select>
    <div>
      Your text: 
      <input id='textbox_id' v-debounce:300ms="cangeText" type="text"/>
      <b-form-checkbox @change="bonus = !bonus; change = !change" switch>Bonus</b-form-checkbox>
      <br/>
    </div>
    <CanvasArea 
    v-model="change"
    :color="color"
    :image="imageSelsect"
    :txt="txetSelect"
    :bonus="bonus"
    ></CanvasArea>
  </div>
</template>

<script>

import CanvasArea from '../components/CanvasArea.vue'

export default {
  name: "MainPage",
  components: {
    CanvasArea
  },
  props: {
    color: {
        type: String,
        required: true
    },
  },
  data() {
    return {
    allImages: [
      {"name": "Daisi", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Daisi.png"},
      {"name": "Shiri", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Shiri.png"},
      {"name": "Sarha", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Sarha.png"},
      {"name": "Rivka", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Rivka.png"},
      {"name": "Noa", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Noa.png"},
      {"name": "Erika", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Erika.png"},
      {"name": "Eli", "value": "https://bigvu-interviews-assets.s3.amazonaws.com/images/Eli.png"}
    ],
    imageSelsect : "",
    txetSelect: "",
    bonus: false,
    change : false

    };

  },

  methods: {
    cangeText(){
      let curText = document.getElementById('textbox_id').value
      this.txetSelect = curText
      this.change = !this.change
    },
    cangeImage(e){
      let idx = e.target.options.selectedIndex-1 ; //cheak 1
      this.imageSelsect = this.allImages[idx].value
      this.change = !this.change
    }
  },

  // beforeMount: async function() {
  //   const response = await fetch("https://cors-anywhere.herokuapp.com/https://bigvu-interviews-assets.s3.amazonaws.com/presenters.json", {mode: 'no-cors'});
  //   console.log(response)
  //   if (response.body){
  //     const data = await response.json();
  //     this.allImages = data;
  //   }
  // }
}

</script>


<style>
input {
  border: 2px solid cadetblue;
  border-radius: 4px;
  width: 16%;
}

select{
  border: 2px solid cadetblue;
  border-radius: 4px;
  width: 13%;
}



</style>