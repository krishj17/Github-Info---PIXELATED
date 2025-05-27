const inputbox=document.querySelector("#input-name-box");
const inputbtn=document.querySelector("#input-btn");
const repoul=document.querySelector("#repos ul");

let data={};
let repodata={};
let username
let link;


function get_user_name(){   
    username=inputbox.value;
    link=`https://api.github.com/users/${username}`;
    inputbox.value="";
    repoul.innerHTML="";
    fetch_data();
}
inputbtn.addEventListener("click", get_user_name);
inputbox.addEventListener("keydown", (e)=>{
    if(e.code=="Enter"){
        get_user_name();
    }
})

async function fetch_data(){
    let response=await fetch(link);
    data=await response.json();

    let repourl=data.repos_url;
    let response2=await fetch(repourl)
    repodata=await response2.json();

    //console.log(data); 
    //console.log(repodata);
    
    display_data();
    display_repos();
}


function display_data(){
    document.querySelector("#p-image img").src=data.avatar_url  // set profile image.
    document.querySelector("#p-image a").href=data.html_url;     // set github profile visit link
    document.querySelector("#p-details #p-name").innerHTML=data.name;
    document.querySelector("#p-details #p-username").innerHTML=data.login;
    document.querySelector("#p-details #p-location span").innerHTML=data.location;
    document.querySelector("#p-details #p-bio").innerHTML=data.bio;
    document.querySelector("#p-details #p-followers span").innerHTML=data.followers;
    document.querySelector("#p-details #p-following span").innerHTML=data.following;
}


function display_repos(){
    //console.log(repodata[0]);   // sample for viewing.
    repodata.forEach((el)=> {
        let repodate=new Date(el.updated_at).toLocaleDateString();  // format 5/15/2025 working!
        let reponame=el.name;   // working!
        let repodesc=el.description     // working!
        repodesc = repodesc==null ? "not available" : repodesc;
        //console.log(repodesc);

        let li=document.createElement("li");
        li.innerHTML=`  <span>
                            <a href="${el.html_url}" target="_blank">${reponame}</a>
                        </span>
                        <span>${repodesc}</span>
                        <span>${repodate}</span>
                    `;
        repoul.append(li);
    });
}