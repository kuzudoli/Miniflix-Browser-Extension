(function(){
    console.log("connected")
    //Creates button parent element
    const btnParent = document.createElement("div");
    //Styling button
    btnParent.style.position = "relative";
    btnParent.style.zIndex = "1";
    btnParent.style.textAlign = "center";
    btnParent.style.opacity = "0";
    btnParent.addEventListener("mouseover", () => {
        btnParent.style.opacity = "1";
        setTimeout(() => {
            btnParent.style.opacity = "0";
        },2000);
    });

    //Button element
    btnParent.innerHTML =
    `
        <button id='pipBtn' 
            style='width:30px;
                    background-color:rgba(0, 0, 0, 0);
                    margin-top:15px;     
        '><svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M432 48H208C190.3 48 176 62.33 176 80V96H128V80C128 35.82 163.8 0 208 0H432C476.2 0 512 35.82 512 80V304C512 348.2 476.2 384 432 384H416V336H432C449.7 336 464 321.7 464 304V80C464 62.33 449.7 48 432 48zM320 128C355.3 128 384 156.7 384 192V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V192C0 156.7 28.65 128 64 128H320zM64 464H320C328.8 464 336 456.8 336 448V256H48V448C48 456.8 55.16 464 64 464z"/></svg>
        </button>
    `
    //Waits loading video element
    const observer = new MutationObserver((mutations, obs) => {
        const targetNode = document.querySelector('body');
        
        //Parses url and gets id
        const url = window.location.href.toString().split('/');
        if(url[4]){//Video Id
            const filmId = url[4].split('?')[0];
            const videoNode = document.getElementById(filmId);

            if (videoNode) {
                targetNode.prepend(btnParent);//Adds miniflix button
                obs.disconnect();
                return;
            }
        }        
    });
    
    //Which changes must listen in elements
    observer.observe(document, {
        childList: true,
        subtree: true
    });

    //Waits loading miniflix button
    const observer2 = new MutationObserver((mutations, obs) => {
        const pipBtn = document.getElementById('pipBtn');

        //Parses url and gets id
        const url = window.location.href.toString().split('/');
        if(url[4]){//Video Id
            const filmId = url[4].split('?')[0];
            if (pipBtn) {
                const videoNode = document.getElementById(filmId);
                const video = videoNode.firstElementChild;
                //console.log(video);
                pipBtn.style.border = "none";
                if("pictureInPictureEnabled" in document){//If miniflix mode enabled adds event listener for disabling
                    pipBtn.addEventListener("click",() => {
                        if(document.pictureInPictureElement){
                            document.exitPictureInPicture().catch(err=>{
                                console.log(err);
                            });
                            return;
                        }
                        video.requestPictureInPicture().catch(err=>{
                            console.log(err);
                        })
                    })
                }
                obs.disconnect();
                return;
            }
        }
        
    });

    //Which changes must listen in elements
    observer2.observe(document, {
        childList: true,
        subtree: true
    });

})();