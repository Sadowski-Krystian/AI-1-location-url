let init = ()=>{
    getPageName();
    let a = document.querySelectorAll('a');
    for(let i =0; i<a.length; i++){
        //a[i].addEventListener('click', getPageName);
        //a[i].addEventListener('click', getHistory);
        a[i].addEventListener('click', addTO);
    }
    let op = document.querySelector('select').getElementsByTagName('option');
    console.log(op);
}



let getPageName = ()=>{
    console.log('hiBar');
    var path = window.location.pathname;
    var hash = window.location.hash;
    console.log(path);
    console.log(hash);
}
let getHistory = ()=>{
    console.log(history.length);
}
const mainTitle = document.querySelector('title').textContent;
let barHistory = [];
let updPageTitle = (value)=>{
    document.querySelector('title').textContent = mainTitle+' #'+value;
}
let addTO = (e)=>{
    e.preventDefault();
    console.log(e.target.href);

    let hash = null;
    if(e.type =='click'){
        hash = e.target.hash.split('#')[1];
    }else{
        hash = location.hash.replace('#','');
    }
    let label = document.querySelector('a[href="#'+hash+'"]');
        label = (label===null) ? 'home' : label.textContent;
    console.log(label+'#'+hash);
    let len = barHistory.length;
    updPageTitle(label);
    history.pushState(hash, label, '#'+hash);
    barHistory[len] = {hashKey: hash, value:label};
    location.hash = "";
    (e.type=='click') ? location.hash=hash : null;
    console.log(barHistory);
    addOpt(barHistory);
}

addOpt = (tab)=>{
    let sel = document.querySelector('select');
    let data = document.querySelector('datalist');
     var attr={value: "#"}
    for (let i = 0; i < tab.length; i++) {
        for(key in tab[i]){
            for(key2 in attr){
                if(key != 'value'){
                attr[key2] = tab[i][key];
                var a2 = addNode('option',attr, null);
                attr[key2] = '#'+tab[i][key];
                var a = addNode('option',attr, tab[i][key]);

            }
            }
            
        }
        
        

    }
    
    sel.appendChild(a);
    data.appendChild(a2);
    let inp = document.querySelector('input');
    inp.addEventListener('change', function(){
        let option = inp.value;
        option = '#'+option;
        window.location = option;
        console.log(option);
        inp.value ='';
    });
    //sel.addEventListener('change',goTo, false);
    sel.addEventListener('change', function(){
        let option = this.options[this.selectedIndex];
        
        if(option.value != "nic"){
            
            window.location = option.value;
            this.options.selecte = this.options[0];
            document.querySelector('select').getElementsByTagName('option')[0].selected = 'selected';
            
            
        }
        
        //console.log(option.value);
    });
}
addNode = (name, attr, text)=> {
    let lnk = document.createElement(name);
    for (var at in attr) {
        lnk.setAttribute(at, attr[at]);
    }
    lnk.textContent = text;
    return lnk;
}

window.addEventListener('load', init);
//window.addEventListener('load', addTO);