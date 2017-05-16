var colors = ['red', 'green', 'blue', 'orange'];
var note=new Vue({
    el:'#notes',
    data:{
        note:[
            {id:1,title:'便签1',content:'',top:100,left:200,theme:'red'}
        ],
        moveInfo:{state:false,index:null,position:{}}
    },
    methods:{
       // md:function (i,e) {
       //     if(e.target.className!="close"){
       //         this.moveInfo.index=i;
       //         this.moveInfo.position={
       //             left:e.offsetX,
       //             top:e.offsetY
       //         }
       //         this.moveInfo.state=true;
       //     }else{
                    //点击删除
       //        this.note.splice(i,1)
       //         this.save();
       //     }
       // },
        md:function (i,e) {
                this.moveInfo.index=i;
                this.moveInfo.position={
                    left:e.offsetX,
                    top:e.offsetY
                }
                this.moveInfo.state=true;
        },
       mv:function (e) {
           if(this.moveInfo.state){
               this.note[this.moveInfo.index].top=e.clientY-this.moveInfo.position.top;
               this.note[this.moveInfo.index].left=e.clientX-this.moveInfo.position.left;
               this.save();
           }
       },
       mu:function () {
            this.moveInfo.state=false
        },
        save:function () {
            localStorage.note=JSON.stringify(this.note)
        },
        addNote:function(e){
            var left=e.clientX-117;
            var top=e.clientY-20;
            var id=this.note.length?this.note[this.note.length-1].id+1:1;
            var theme=colors[Math.floor(Math.random()*colors.length)];
            var title='便签'+id;
            var add_note={id,title,content:'',top,left,theme};
            this.note.push(add_note)
            this.save()
        }
    },
    //周期函数与method同级
    mounted:function () {
        //按delete键删除
        document.onkeyup=(function(){
            if(this.moveInfo.index!=null){
                this.note.splice(this.moveInfo.index,1);
                this.moveInfo.index=this.note.length?this.note.length-1:null
                this.save()
            }
        }).bind(this)   //没有bind时this指的是document，bind后指的是vue
        if(localStorage.note){
            this.note=JSON.parse(localStorage.note)
        }
    }
})