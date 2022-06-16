window.onload=function()
    {
        if(window.innerWidth>850)
        {
            document.getElementById("menuclick").style.display="none";
        }
        else{
            document.getElementById("menuclick").style.display="flex";
        }
    }
class Entry{
    constructor(owner,tempvehicle,templicenceplate,tempentry,tempexit){
        this.owner = owner;
        this.tempvehicle = tempvehicle;
        this.templicenceplate = templicenceplate;
        this.tempentry = tempentry;
        this.tempexit = tempexit;
    }
}
function drop(){
    var x=document.getElementsByClassName("getdown");
    if(x[0].style.display==="none" && window.innerWidth<=850)
    {
        for(var i=0;i<x.length;i++)
        {
            x[i].style.display="block";
        }
    }
    else if(window.innerWidth<=850 ){
        for(var i=0;i<x.length;i++)
        {
            x[i].style.display="none";
        }
    }
}
class Thatweseeonscreen{
    static showtheentries(){
        const entries = Store.getEntries();
        entries.forEach((entry) => Thatweseeonscreen.inserttheentries(entry));
    }
    static inserttheentries(entry){
        const tableBody=document.querySelector('#tableBody');
        const row = document.createElement('tr');
        row.innerHTML = `   <td>${entry.owner}</td>
                            <td>${entry.tempvehicle}</td>
                            <td>${entry.templicenceplate}</td>
                            <td>${entry.tempentry}</td>
                            <td>${entry.tempexit}</td>
                            <td><button class="btn btn-danger delete">X</button></td>
                        `;
        tableBody.appendChild(row);
    }
    static clearthefields(){
        const inputs = document.querySelectorAll('.form-details');
        inputs.forEach((input)=>input.value="");
    }
    static maketheentrynotvisible(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }
    static clicktoshowmessage(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className} w-50 mx-auto newdevelop`;
        div.appendChild(document.createTextNode(message));
        const formContainer = document.querySelector('#newdiv');
        const form = document.querySelector('#formee');
        formContainer.insertBefore(div,form);
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    static validateInputs(){
        const owner = document.querySelector('#ownername').value;
        const tempvehicle = document.querySelector('#vehicle-name').value;
        const templicenceplate = document.querySelector('#vehicle-number').value;
        const tempentry = document.querySelector('#entry-date').value;
        const tempexit = document.querySelector('#exit-date').value;
        var licencechecker = /^(?:[A-Z]{2}-\d{2}-[A-Z]{2}-\d{4})$/;
        if(owner === '' || tempvehicle === '' || templicenceplate === '' || tempentry === '' || tempexit === ''){
            Thatweseeonscreen.clicktoshowmessage('you have to fill all fields','danger');
            return false;
        }
        if(tempexit < tempentry){
            Thatweseeonscreen.clicktoshowmessage('Exit Date cannot be lower than Entry Date','danger');
            return false;
        }
        if(!licencechecker.test(templicenceplate)){
            Thatweseeonscreen.clicktoshowmessage('License Plate must be like HR-45-PN-4592','danger');
            return false;
        }
        return true;
    }
}
window.onresize=function()
{
 const x=document.getElementsByClassName("getdown");
    if(window.innerWidth>850)
    {
         for(var i=0;i<x.length;i++)
         {
             x[i].style.display="block";
         }
         document.getElementById("menuclick").style.display="none";
    }
    else{
         for(var i=0;i<x.length;i++)
         {
             x[i].style.display="none";
            
         }
         document.getElementById("menuclick").style.display="flex";
    }
}
class Store{
    static getEntries(){
        let entries;
        if(localStorage.getItem('entries') === null){
            entries = [];
        }
        else{
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }
    static addEntries(entry){
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
    static removeEntries(templicenceplate){
        const entries = Store.getEntries();
        entries.forEach((entry,index) => {
            if(entry.templicenceplate === templicenceplate){
                entries.splice(index, 1);
            }
        });
        localStorage.setItem('entries', JSON.stringify(entries));
    }
}
    document.addEventListener('DOMContentLoaded',Thatweseeonscreen.showtheentries);
    document.querySelector('#formee').addEventListener('submit',(e)=>{
        e.preventDefault();
        const owner = document.querySelector('#ownername').value;
        const tempvehicle = document.querySelector('#vehicle-name').value;
        const templicenceplate = document.querySelector('#vehicle-number').value;
        const tempentry = document.querySelector('#entry-date').value;
        const tempexit = document.querySelector('#exit-date').value;
        if(!Thatweseeonscreen.validateInputs()){
            return;
        }
        const entry = new Entry(owner, tempvehicle, templicenceplate, tempentry, tempexit);
        Thatweseeonscreen.inserttheentries(entry);
        Store.addEntries(entry);
        Thatweseeonscreen.clearthefields();
        Thatweseeonscreen.clicktoshowmessage('vehicle details successfully added ','success');
    });
    document.querySelector('#tableBody').addEventListener('click',(e)=>{
        Thatweseeonscreen.maketheentrynotvisible(e.target);
        var templicenceplate = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        Store.removeEntries(templicenceplate);
        Thatweseeonscreen.clicktoshowmessage('vehicle details successfully removed ','success');
    })
    document.querySelector('#searchInput').addEventListener('keyup', function searchTable(){
    const searchValue = document.querySelector('#searchInput').value.toUpperCase();
    const tableLine = (document.querySelector('#tableBody')).querySelectorAll('tr');
    for(let i = 0; i < tableLine.length; i++){
        var count = 0;
        const lineValues = tableLine[i].querySelectorAll('td');
        for(let j = 0; j < lineValues.length - 1; j++){
            if((lineValues[j].innerHTML.toUpperCase()).startsWith(searchValue)){
                count++;
            }
        }
        if(count > 0){
            
            tableLine[i].style.display = '';
        }else{
            tableLine[i].style.display = 'none';
        }
    }
    });