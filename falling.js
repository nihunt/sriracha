var GlobalObject=new Array();
var Falling = {
    speed : 10,
    spacing : 100,
    Instances:new Array(),
    counter:0,
    floors:{
        count:0,
        array:new Array(),
        max:6
    },
    colors:{
        sky:"#bcf9ff",
        floor:"#b5750e",
        ball:"#f75151"
    },
    ball:{
        radius:20,
        state:'up',
        y:0
    },
    points:0,
    gameState:true,
    wordList:[
        "debug","debut","debye","decaf","decal","decay","decks","decor","decos","decoy","decry","dedal","deeds","deedy","deems","deeps","deers","deets","defat","defer","defis","defog","degas","degum","deice","deify","deign","deils","deism","deist","deity","deked","dekes","dekko","delay","deled","deles","delfs","delft","delis","dells","delly","delta","delts","delve","demes","demic","demit","demob","demon","demos","demur","denar","denes","denim","dense","dents","deoxy","depot","depth","derat","deray","derby","derma","derms","derry","desex","desks","deter","detox","deuce","deva","devel","devil","devon","dewan","dewar","dewax","dewed","dexes","dexie","dhaks","dhals","dhobi","dhole","dhoti","dhows","dhuti","dials","diary","diazo","diced","dicer","dices","dicey","dick","dicky","dicot","dicta","dicty","didie","didos","didst","diene","diets","diffs","dight","digit","diked","diker","dikes","dikey","dildo","dills","dilly","dimer","dimes","dimly","dinar","dined","diner","dines","dinge","dingo","dings","dingy","dinks","dinky","dinos","dints","diode","diols","dippy","dipso","diram","direr","dirge","dirks","dirls","dirts","dirty","disci","disco","discs","dishy","disks","disme","ditas","ditch","dites","ditsy","ditto","ditty","ditzy","divan","diva","dived","diver","dives","divot","divvy","diwan","dixit","dizen","dizzy","djinn","djins","doats","dobby","dobie","dobla","dobra","dobro","docks","dodge","dodgy","dodos","doers","doest","doeth","doffs","doges","dogey","doggo","doggy","dogie","dogma","doily","doing","doits","dojos","dolce","dolci","doled","doles","dolls","dolly","dolma","dolor","dolts","domal","domed","domes","domic","donas","donee","donga","dongs","donna","donne","donor","donsy","donut","doody","dooly","dooms","doomy","doors","doozy","dopas","doped","doper","dopes","dopey","dorks","dorky","dorms","dormy","dorps","dorrs","dorsa","dorty","dosed","doser","doses","dotal","doted","doter","dotes","dotty","doubt","douce","dough","doula","douma","doums","doura","douse","doven","doves","dowdy","dowed","dowel","dower","dowie","downs","downy","dowry","dowse","doxie","doyen","doyly","dozed","dozen","dozer","dozes","drabs","draff","draft","drags","drail","drain","drake","drama","drams","drank","drape","drats","drave","drawl","drawn","draws","drays","dread","dream","drear","dreck","dreed","drees","dregs","dreks","dress","drest","dribs","dried","drier","dries","drift","drill","drily","drink","drips","dript","drive","droid","droit","droll","drone","drool","droop","drops","dropt","dross","drouk","drove","drown","drubs","drugs","druid","drums","drunk","drupe","druse","dryad","dryer","dryly","duads","duals","ducal","ducat","duces","duchy","ducks","ducky","ducts","duddy","duded","dudes","duels","duets","duffs","dufus","duits","duked","dukes","dulia","dulls","dully","dulse","dumas","dumbo","dumbs","dumka","dumky","dummy","dumps","dumpy","dunam","dunce","dunch"
    ],
    words:{
        currentLetter:0,
        array:new Array()
    },
    init:function(c){
        this.ctx=c.getContext("2d");
        this.width=$(c).width();
        this.height=$(c).height();
        this.ctx.fillStyle=this.colors.sky;
        this.ctx.fillRect(0,0,this.width,this.height);
        this.addFloor();
        this.ball.y=this.floors.array[this.floors.count-1]-this.ball.radius;
        this.drawBall(this.ball.y);
        this.id = Falling.Instances.length,
        this.Instances[this.id] = this;
        this.startLoop();
        return;
    },
    drawFloor:function(y){
        this.ctx.fillStyle=this.colors.floor;
        this.ctx.fillRect(0,y,this.width,5);
    },
    clearFloor:function(y){
        this.ctx.fillStyle=this.colors.sky;
        this.ctx.fillRect(0,y,this.width,5);
    },
    addFloor:function(){
        console.log("addFloor - spacing:" + this.spacing);
        if(this.floors.count==this.floors.max){
            this.speed=this.speed+1;
            return;
        }
        this.floors.count++;
        var newFloor=this.height-1;
        this.floors.array.push(newFloor);
        this.drawFloor(newFloor);
        this.drawWord(newFloor,this.randomWord());
        return;
    },
    drawWord:function(y,word){
        this.ctx.fillStyle="black";
        this.ctx.font="20pt Arial";
        this.ctx.fillText(word,(this.width/2)+this.ball.radius+10,y-20);
        if(y==this.floors.array[0] && this.words.currentLetter>0)
            this.correctLetters();
    },
    correctLetters:function(){
        this.ctx.fillStyle="black";
        this.ctx.font="20pt Arial";
        this.ctx.fillText(this.words.array[0],(this.width/2)+this.ball.radius+10,this.floors.array[0]-20);
        this.ctx.fillStyle="green";
        this.ctx.font="20pt Arial";
        this.ctx.fillText(this.words.array[0].substr(0,this.words.currentLetter),(this.width/2)+this.ball.radius+10,this.floors.array[0]-20);
    },
    clearWord:function(y){
        this.ctx.fillStyle=this.colors.sky;
        this.ctx.fillRect((this.width/2)+this.ball.radius+10,y-40,(this.width/2)-this.ball.radius-10,40);
    },
    drawBall:function(y){
        this.ctx.fillStyle=this.colors.ball;
        this.ctx.beginPath();
        this.ctx.arc((this.width/2),y,this.ball.radius,0,Math.PI*2,true);
        this.ctx.closePath();
        this.ctx.fill();
    },
    loop:function(){
        this.counter++;
        if(!this.gameState)
            return;
        this.moveBall();
        for(var i=0;i<this.floors.count;i++){
            //console.log("Loop "+f+":"+this.floors.array[i]);
            this.clearFloor(this.floors.array[i]);
            this.clearWord(this.floors.array[i]);
            this.floors.array[i]=this.floors.array[i]-1;
            if(this.floors.array[i]<=0){
                this.floors.array.splice(0,1);
                this.floors.count=this.floors.count-1;
            }
            this.drawFloor(this.floors.array[i]);
            this.drawWord(this.floors.array[i],this.words.array[i]);
            if(i==this.floors.count-1){
                if(this.floors.array[i]<=this.height-this.spacing){
                    this.addFloor();
                    if(this.spacing>100)
                        this.spacing=this.spacing-2;
                }
            }
        }
    },
    removeFloor:function(){
        this.clearFloor(this.floors.array[0]);
        this.clearWord(this.floors.array[0]);
        this.floors.array.splice(0,1);
        this.floors.count=this.floors.count-1;
        if(this.floors.count==0){
            this.addFloor();
            if(this.spacing>100)
                this.spacing=this.spacing-2;
        }
        this.points++;
    },
    handleKey:function(e){
        //console.log("handleKey");
        var kc=e.keyCode;
        if(kc==8)//Backspace
            e.preventDefault();
        else if(kc==13){
            e.preventDefault();
            this.removeFloor();
            this.ball.state="down";
        }else{
            //console.log(this.words.array[0].charCodeAt(this.words.currentLetter)+" - "+kc);
            if(this.words.array[0].charCodeAt(this.words.currentLetter)==kc){
                //console.log("correctLetters called");
                this.correctLetters();
                this.words.currentLetter++;
                if(this.words.currentLetter==this.words.array[0].length){
                    this.removeFloor();
                    this.ball.state="down";
                    this.words.currentLetter=0;
                    this.words.array.splice(0,1);
                }
            }else{
                this.words.currentLetter=0;
            }
        }
    },
    moveBall:function(){
        if(this.ball.y+this.ball.radius<=1)
            return this.gameOver();
        this.clearBall(this.ball.y);
        if(this.ball.state=="down" && this.between(this.ball.y+this.ball.radius,this.floors.array[0]+3,this.floors.array[0]-3)){
            this.ball.y=this.floors.array[0]-this.ball.radius;
            this.ball.state="up";
        }else if(this.ball.state=='up')
            this.ball.y=this.ball.y-1;
        else if(this.ball.state=='down')
            this.ball.y=this.ball.y+4;
        this.drawBall(this.ball.y);
    },
    clearBall:function(y){
        this.ctx.fillStyle=this.colors.sky;
        this.ctx.beginPath();
        this.ctx.arc((this.width/2),y,this.ball.radius+1,0,Math.PI*2,true);
        this.ctx.closePath();
        this.ctx.fill();
    },
    between:function(test,upper,lower){
        if(test<=upper && test>=lower)
            return true;
        else
            return false;
    },
    gameOver:function(){
        clearInterval(this.interval);
        this.gameState=false;
        this.ctx.fillStyle="black";
        this.ctx.textAlign="center";
        this.ctx.font="20pt Arial";
        this.ctx.fillText("Game Over", this.width/2, this.height/2);
        this.ctx.font="16pt Arial";
        this.ctx.fillText("You scored "+this.points+" points!  Great Job!", this.width/2, (this.height/2)+20);
    },
    startLoop:function(){
        this.interval=setInterval('Falling.Instances['+this.id+'].loop();',1000/this.speed/5);
    },
    randomWord:function(){
        var newWord= this.wordList[Math.floor(Math.random()*this.wordList.length)];
        this.words.array.push(newWord);
       return newWord;
    }
    
}
$("document").ready(function(){
    $("document").focus()
    Falling.init($("#game")[0]);
    $(document).keypress(function(e){
        if(Falling.gameState)
            Falling.handleKey(e);
    });
});