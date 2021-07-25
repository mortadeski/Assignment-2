<template>
    <div>
        <canvas id="canvas" width="640" height="360"></canvas> 
        <br/>
        <b-spinner v-if="loading" label="Spinning"></b-spinner>
    </div>
</template>

<script>

import { BSpinner } from 'bootstrap-vue'

export default {
    name: "CanvasArea",
    components:{BSpinner},
    props:{
        color: {
            type: String,
            required: true
        },     
        image:{
            type: String,
        }, 
        txt:{
            type: String,
        },
        bonus:{
            type: Boolean,
        }    
    },
    data(){
        return{
            loading: false,
        }
    },
    methods: {
        fitText(context, text, x, y, maxWidth, maxHigth, bonuss= false, lineHeight=40, maxFount= 40){
            let words = text.toString().split(" ");
            if (words.length == 0){
                return
            }
            let maximumLines = maxHigth / lineHeight
            let allLines = this.breakIntoLines(context, text, x, y, maxWidth, lineHeight, maxFount)
            while (allLines.length > maximumLines && maxFount > 0){
                lineHeight = lineHeight - 1
                maxFount = maxFount - 1
                allLines = this.breakIntoLines(context, text, x, y, maxWidth, lineHeight, maxFount)
                maximumLines = maxHigth / lineHeight
            }
            //center of canvas
            let restHigth = this.centerHigth(maximumLines, allLines.length, lineHeight)
            let restWidth = 0
            //style
            context.fillStyle = 'black'; 
            context.textBaseline = "top";
            for (let i in allLines){
                if (bonuss){
                    restWidth = this.centerWidth(context, allLines, maxWidth, i)
                }
                context.fillText(allLines[i][0], allLines[i][1] + restWidth, allLines[i][2] + restHigth, maxWidth)
            }
        },

        breakIntoLines(context, text, x, y, maxWidth, lineHeight, fountSize) {
            let words = text.toString().split(" ");
            let allLines = []
            context.font = fountSize.toString() +'px Inter'; 

            let newLine = "" + words[0] + " ";

            for(let idx = 1; idx < words.length; idx++) {
                let tryLine = newLine + words[idx] + " ";
                let tryWidth = context.measureText(tryLine).width;
                if (tryWidth > maxWidth) {
                    allLines.push([newLine, x, y])
                    newLine = words[idx] + ' ';
                    y += lineHeight;
                    continue
                }
                newLine = tryLine;
            }
            allLines.push([newLine, x, y, maxWidth])
            return allLines
            
      },
        centerHigth(maximumLines,len, lineHeight){
            let toCenter = Math.floor((maximumLines - len)/2)
            let rest = 0
            if (toCenter > 0){
                rest = lineHeight * toCenter
            }
            return rest
        },
        centerWidth(ctx,allLines, maxWidth, i){
            let lineActualWidth = ctx.measureText(allLines[i][0]).width;
            let restWidth =  (maxWidth - lineActualWidth) / 2
                if (restWidth < 0){
                    restWidth = 0
                }
            return restWidth;
        },
        loadImage(url) {
            return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
        },

        async drow(){
            const canvas = document.getElementById('canvas')
            const ctx = canvas.getContext('2d')
            ctx.font = '40px Inter'; 
            ctx.textAlign = "center";
            ctx.fillStyle = this.color;
            if (this.image){
                this.loading = true
                let img = await this.loadImage(this.image);
                this.loading = false
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 20, 20, canvas.width-40, canvas.height-40)
            }
            else{
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            this.fitText(ctx, this.txt, canvas.width/2 ,20, canvas.width - 40, canvas.height - 40)

        },
        async drowImageBonus(){
            // if (!this.image){
            //     return
            // }
            const canvas = document.getElementById('canvas')
            const ctx = canvas.getContext('2d')
             this.loading = true
            let img = await this.loadImage(this.image);
             this.loading = false
            ctx.drawImage(img, 0, 0, (2/3)*canvas.width, canvas.height)
            if (!this.txt){
                ctx.fillStyle = this.color;
                ctx.fillRect((2/3)*canvas.width, 0, (1/3)*canvas.width, canvas.height);
                
            }
        },
        writhBonus(){
            // if (!this.txt){
            //     return
            // }
            const canvas = document.getElementById('canvas')
            const ctx = canvas.getContext('2d')
            ctx.font = '40px Inter'; 
            ctx.textAlign = "left";
            ctx.fillStyle = this.color;
            ctx.fillRect((2/3)*canvas.width, 0, (1/3)*canvas.width, canvas.height);
            this.fitText(ctx, this.txt, (2/3)*canvas.width ,0, (1/3)*canvas.width, 360, true)
            if (!this.image){
                ctx.fillStyle = this.color;
                ctx.fillRect(0, 0, (2/3)*canvas.width, canvas.height);

            }
        }
    },
    watch :{
        image: function(){
            if (this.bonus){
                this.drowImageBonus()
                return                
            }
            this.drow()
        },
        txt: function(){
            if (this.bonus){
                this.writhBonus()
                return
            }
            this.drow()
        },
        bonus:function(){
            if (this.bonus){
                if (this.image){
                    this.drowImageBonus()
                }
                if(this.txt){
                    this.writhBonus()
                }
                return
            }
            if (this.image || this.txt){
                this.drow()
            }
        }
    }
}

</script>

<style>
    #canvas {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        text-align: center;
    }
</style>