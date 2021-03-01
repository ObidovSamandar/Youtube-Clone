
let videosInLocalStorage = JSON.parse(window.localStorage.getItem('videos'))
let newobj = {};
let errorHandeler = document.querySelector('.errorText');
let allInputTags = document.getElementsByTagName('input')
add.onclick = () => {
    try {
        if (videoLink.value != "" && imgLink.value != "" &&
            titleText.value != "") {
            let videoInput = videoLink.value;
            let imgInput = imgLink.value;
            if (videoInput.indexOf('iframe') != -1 && videoInput.indexOf('src') != -1) {
                newobj['iframe'] = videoLink.value;
            } else { throw new Error('Please Enter  Correct Video Link(Iframe)!!!') }
            if (imgInput.indexOf('https://') != -1) {
                newobj['coverPhoto'] = imgLink.value;
            } else { throw new Error('Please Enter Correct Img Link!!!') }
            newobj['title'] = titleText.value;
        } else {
            for (let inpt of allInputTags) {
                if (inpt.value == "") {
                    inpt.style.borderBottom = '1px solid red';
                }
            }
            throw new Error('Please Fill All details!!!')
        }
        if (videosInLocalStorage == null) {
            let newArr = [];
            newArr.push(newobj);
            window.localStorage.setItem('videos', JSON.stringify(newArr));
            videoLink.value=null
            imgLink.value=null
            titleText.value=null
            errorHandeler.style.color='green'
            errorHandeler.innerText='Video Added'
            setTimeout(() => {
                makingAllBordersGreen();
            },500);

            setTimeout(() => {
                errorHandeler.style.opacity='0'
            },800);
        } else {
            videosInLocalStorage.push(newobj);
            window.localStorage.setItem('videos', JSON.stringify(videosInLocalStorage))
            videoLink.value=null
            imgLink.value=null
            titleText.value=null
            errorHandeler.style.color='green'
            errorHandeler.innerText='Video Added'
            setTimeout(() => {
                makingAllBordersGreen();
            }, 500);
            setTimeout(() => {
                errorHandeler.style.opacity='0'
            },800);
        }
    }
    catch (e) {
        errorHandeler.style.color='red'
        errorHandeler.innerText = e.message;
    }
}
for(let inputs of allInputTags){
    inputs.onkeyup=(e)=>{
       if(e.target.value!=""){
           e.target.style.borderBottom='1px solid green';
       }else{
            e.target.style.borderBottom='1px solid red';
       }
    }
}


function makingAllBordersGreen(){
    for(let elem of allInputTags){
        elem.style.borderBottom='1px solid #9090903f'
    }
}
